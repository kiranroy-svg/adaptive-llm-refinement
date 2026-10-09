import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { readFlow, writeFlow, post } from "../lib/crispFlow";
function InitialResponse() {
  const navigate = useNavigate(); const [loading,setLoading] = useState(false); const [error,setError] = useState("");
  const flow = readFlow();
  async function evaluate() {
    if (!flow?.question || !flow?.initialResponse) { setError("Generate a response in Assistant first."); return; }
    setLoading(true); setError("");
    try { const evaluation = await post("/api/evaluate", { question: flow.question, response: flow.initialResponse }); writeFlow({...flow, initialEvaluation:evaluation, timings:{...(flow.timings||{}), evaluate:evaluation.duration_seconds||0}, stage:2}); navigate("/evaluation"); }
    catch(e) { setError(e.message); } finally { setLoading(false); }
  }
  return <div className="space-y-8"><div><h1 className="text-3xl font-bold text-white">Initial Response</h1><p className="mt-2 text-slate-400">Review the response generated for your query before evaluation.</p></div>
    {!flow?.initialResponse ? <Empty /> : <><Panel title="Your Query"><p className="leading-7 text-slate-300">{flow.question}</p></Panel><Panel title="Generated Response"><p className="whitespace-pre-wrap leading-8 text-slate-300">{flow.initialResponse}</p></Panel><div className="flex justify-end"><button disabled={loading} onClick={evaluate} className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 disabled:opacity-50">{loading ? "Evaluating..." : "Evaluate Response →"}</button></div>{error && <p className="text-sm text-red-400">{error}</p>}</>}
  </div>;
}
function Panel({title,children}) { return <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-xl font-semibold text-white">{title}</h2><div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-5">{children}</div></div>; }
function Empty(){return <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">No response yet. Return to Assistant and generate a response first.</div>}
export default InitialResponse;
