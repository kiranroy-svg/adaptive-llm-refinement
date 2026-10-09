import json
import os
import time
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from openai import OpenAI

load_dotenv()
ROOT = Path(__file__).resolve().parent
HISTORY_FILE = ROOT / "analytics_history.json"
SETTINGS_FILE = ROOT / "crisp_settings.json"
DEFAULT_THRESHOLD = 9.5
DEFAULT_SETTINGS = {
    "model": "openai/gpt-oss-20b", "threshold": DEFAULT_THRESHOLD,
    "max_iterations": 1,
    "weights": {"accuracy": 20, "completeness": 20, "reasoning": 20, "clarity": 20, "safety": 20},
}

from evaluation.evaluator import evaluate_response
from evaluation.decision_controller import decide_refinement
from pipeline import generate_response
from refinement.refiner import refine_response

api_key = os.getenv("GROQ_API_KEY")
client = OpenAI(api_key=api_key, base_url="https://api.groq.com/openai/v1") if api_key else None
app = FastAPI(title="CRISP API")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], allow_methods=["*"], allow_headers=["*"])

class GenerateRequest(BaseModel):
    question: str = Field(min_length=1, max_length=10000)
class EvaluateRequest(BaseModel):
    question: str = Field(min_length=1, max_length=10000)
    response: str = Field(min_length=1)
class DecisionRequest(BaseModel):
    evaluation: dict
class CritiqueRequest(BaseModel):
    question: str
    response: str
    evaluation: dict
class RefineRequest(BaseModel):
    question: str
    initial_response: str
    evaluation: dict
    decision: dict
class RecordRunRequest(BaseModel):
    question: str
    initial_response: str
    initial_evaluation: dict
    final_response: str
    final_evaluation: dict
    refined: bool
    latency_seconds: float | None = None

class SettingsRequest(BaseModel):
    threshold: float = Field(ge=0, le=10)
    model: str = "openai/gpt-oss-20b"
    max_iterations: int = Field(default=1, ge=1, le=1)
    weights: dict[str, float] | None = None

def read_json(path, default):
    if not path.exists(): return default
    try: return json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError): return default

def write_json(path, value): path.write_text(json.dumps(value, indent=2), encoding="utf-8")
def get_settings(): return {**DEFAULT_SETTINGS, **read_json(SETTINGS_FILE, {})}
def fail(message, status=500): raise HTTPException(status_code=status, detail=message)

@app.get("/api/health")
def health(): return {"status": "ok"}

@app.get("/api/settings")
def settings(): return get_settings()

@app.put("/api/settings")
def save_settings(request: SettingsRequest):
    values = request.model_dump(); weights = values.get("weights") or DEFAULT_SETTINGS["weights"]
    if set(weights) != set(DEFAULT_SETTINGS["weights"]): fail("All five evaluation dimensions are required.", 400)
    if any(value < 0 for value in weights.values()) or sum(weights.values()) <= 0: fail("Weights must be non-negative and sum to more than zero.", 400)
    values["weights"] = weights; write_json(SETTINGS_FILE, values); return values

@app.post("/api/generate")
def generate(request: GenerateRequest):
    question = request.question.strip()
    if not question: fail("Enter a question.", 400)
    start = time.perf_counter()
    try: answer = generate_response(question)
    except Exception as exc: fail(f"Response generation failed: {exc}")
    return {"question": question, "initial_response": answer, "generated_at": datetime.now(timezone.utc).isoformat(), "duration_seconds": round(time.perf_counter()-start, 3)}

@app.post("/api/evaluate")
def evaluate(request: EvaluateRequest):
    start = time.perf_counter()
    try: result = evaluate_response(request.question, request.response)
    except Exception as exc: fail(f"Evaluation failed: {exc}")
    return {**result, "duration_seconds": round(time.perf_counter()-start, 3)}

@app.post("/api/decision")
def decision(request: DecisionRequest):
    start = time.perf_counter(); threshold = get_settings().get("threshold", DEFAULT_THRESHOLD)
    result = decide_refinement(request.evaluation, threshold=threshold)
    return {**result, "threshold": threshold, "duration_seconds": round(time.perf_counter()-start, 3)}

@app.post("/api/critique")
def critique(request: CritiqueRequest):
    start = time.perf_counter(); ev = request.evaluation
    strengths, areas, suggestions = [], [], []
    for key in ("accuracy", "completeness", "reasoning", "clarity", "safety"):
        score = ev.get(key)
        feedback = ev.get(f"{key}_feedback", "")
        if score is not None and score >= 8:
            strengths.append(f"{key.title()} ({score}/10): {feedback or 'Scored strongly in this dimension.'}")
        if score is not None and score < 8:
            areas.append(f"{key.title()} ({score}/10): {feedback or 'This dimension needs improvement.'}")
            suggestions.append(f"Improve {key} by addressing this evaluator feedback: {feedback or 'Review the response for gaps in this dimension.'}")
    if not strengths: strengths.append("The evaluator did not identify a dimension scoring 8/10 or higher.")
    if not areas: areas.append("No dimension scored below 8/10; review the response for task-specific details before finalizing.")
    if not suggestions: suggestions.append("Preserve the response's strong dimensions and verify that it directly addresses every part of the question.")
    return {"strengths": strengths, "areas_for_improvement": areas, "suggestions": suggestions, "duration_seconds": round(time.perf_counter()-start, 3)}

@app.post("/api/refine")
def refine(request: RefineRequest):
    start = time.perf_counter()
    if not request.decision.get("refinement_required"):
        return {"final_response": request.initial_response, "final_evaluation": request.evaluation, "refined": False, "reason": request.decision.get("reason", "Threshold met; original response retained."), "duration_seconds": round(time.perf_counter()-start, 3)}
    try:
        candidate = refine_response(request.question, request.initial_response, request.evaluation)
        candidate_eval = evaluate_response(request.question, candidate)
    except Exception as exc: fail(f"Refinement failed: {exc}")
    improved = candidate_eval.get("overall_score", 0) > request.evaluation.get("overall_score", 0)
    return {"final_response": candidate if improved else request.initial_response, "final_evaluation": candidate_eval if improved else request.evaluation, "candidate_response": candidate, "candidate_evaluation": candidate_eval, "refined": True, "improved": improved, "reason": ("Refined response scored higher; it was selected." if improved else "Refinement did not improve the score; the initial response was retained."), "duration_seconds": round(time.perf_counter()-start, 3)}

@app.post("/api/record-run")
def record_run(request: RecordRunRequest):
    history = read_json(HISTORY_FILE, [])
    now = datetime.now(timezone.utc).isoformat()
    record = {"id": now, "timestamp": now, "question": request.question, "initial_response": request.initial_response, "final_response": request.final_response, "initial_evaluation": request.initial_evaluation, "final_evaluation": request.final_evaluation, "refined": request.refined, "latency_seconds": request.latency_seconds, "llm_calls": (4 if request.refined else 2), "model": get_settings().get("model", "openai/gpt-oss-20b"), "experiment": "Adaptive", "input_tokens": None, "output_tokens": None, "cost_usd": None}
    history.append(record); write_json(HISTORY_FILE, history)
    return {"saved": True, "id": record["id"]}

@app.post("/api/run")
def run_query(request: GenerateRequest):
    # Kept for backward compatibility with clients that use the all-at-once pipeline.
    from pipeline import run_assistant
    start = time.perf_counter()
    try: result = run_assistant(request.question.strip(), threshold=get_settings().get("threshold", DEFAULT_THRESHOLD))
    except Exception as exc: fail(f"CRISP pipeline failed: {exc}")
    result["latency_seconds"] = round(time.perf_counter()-start, 3)
    return result

@app.get("/api/analytics")
def analytics():
    history = read_json(HISTORY_FILE, [])
    if not history:
        return {"total_queries": 0, "runs": [], "average_quality": None, "average_latency": None, "refinement_rate": None, "average_llm_calls": None, "quality_improvement": None, "dimensions": {}, "quality_trend": [], "refinement_trend": [], "latency_trend": [], "token_trend": [], "cost_usd": None}
    scores = [r["final_evaluation"]["overall_score"] * 10 for r in history]
    initial = [r["initial_evaluation"]["overall_score"] * 10 for r in history]
    latencies = [r["latency_seconds"] for r in history if r.get("latency_seconds") is not None]
    refined = sum(bool(r["refined"]) for r in history)
    dimensions = {}
    for key in ("accuracy", "completeness", "reasoning", "clarity", "safety"):
        vals = [r["final_evaluation"][key] * 10 for r in history if key in r["final_evaluation"]]
        dimensions[key.title()] = round(sum(vals)/len(vals), 2) if vals else None
    recent = history[-7:]
    return {"total_queries":len(history), "runs":list(reversed(history)), "average_quality":round(sum(scores)/len(scores),2), "average_latency":round(sum(latencies)/len(latencies),2) if latencies else None, "refinement_rate":round(refined/len(history)*100,2), "average_llm_calls":round(sum(r["llm_calls"] for r in history)/len(history),2), "quality_improvement":round(sum(f-i for f,i in zip(scores,initial))/len(history),2), "dimensions":dimensions, "quality_trend":[{"label":r["timestamp"][5:10],"initial":round(r["initial_evaluation"]["overall_score"]*10,2),"final":round(r["final_evaluation"]["overall_score"]*10,2)} for r in recent], "refinement_trend":[{"label":r["timestamp"][5:10],"value":100 if r["refined"] else 0} for r in recent], "latency_trend":[{"label":r["timestamp"][5:10],"value":r["latency_seconds"]} for r in recent if r.get("latency_seconds") is not None], "token_trend":[], "cost_usd":None}
