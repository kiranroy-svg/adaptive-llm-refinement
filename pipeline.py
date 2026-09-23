import os

from dotenv import load_dotenv
from openai import OpenAI

from evaluation.evaluator import evaluate_response
from evaluation.decision_controller import decide_refinement, DEFAULT_THRESHOLD

from refinement.refiner import refine_response


# ==========================================
# API CONFIGURATION
# ==========================================

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY not found.")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1"
)


GENERATOR_MODEL = "openai/gpt-oss-20b"


# ==========================================
# GENERATOR (initial LLM)
# ==========================================

def generate_response(question):

    result = client.chat.completions.create(
        model=GENERATOR_MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a helpful AI assistant. "
                    "Answer the user's question accurately, "
                    "clearly, and completely."
                )
            },
            {
                "role": "user",
                "content": question
            }
        ],
        temperature=0.2
    )

    return result.choices[0].message.content.strip()


# ==========================================
# ADAPTIVE REFINEMENT PIPELINE
# ==========================================

def adaptive_refinement(question, initial_response, threshold=DEFAULT_THRESHOLD):
    """
    Implements exactly this flow:

    1. Judge scores the initial response on 5 dimensions + overall score + per-metric feedback.
    2. If overall score >= threshold -> return initial response as-is.
    3. If overall score < threshold -> send question + initial response + feedback
       back to the SAME generator LLM to produce a refined response.
    4. Judge scores the refined response the same way.
    5. Compare both overall scores. Return whichever response scored higher.
    """

    print("\nEvaluating initial response...")
    initial_evaluation = evaluate_response(question, initial_response)
    initial_score = initial_evaluation["overall_score"]
    print(f"Initial Overall Score: {initial_score}/10")

    decision = decide_refinement(initial_evaluation, threshold=threshold)
    print(f"Refinement Required: {decision['refinement_required']}")
    print(f"Reason: {decision['reason']}")

    # -------------------------------
    # Good enough as-is
    # -------------------------------
    if not decision["refinement_required"]:
        return {
            "final_response": initial_response,
            "final_evaluation": initial_evaluation,
            "refined": False,
            "initial_evaluation": initial_evaluation,
            "refined_evaluation": None
        }

    # -------------------------------
    # Refine using the same LLM + judge feedback
    # -------------------------------
    print("\nSending feedback back to the initial LLM for refinement...")
    refined_response = refine_response(question, initial_response, initial_evaluation)

    print("\nEvaluating refined response...")
    refined_evaluation = evaluate_response(question, refined_response)
    refined_score = refined_evaluation["overall_score"]
    print(f"Refined Overall Score: {refined_score}/10")

    # -------------------------------
    # Compare both scores, keep the better one
    # -------------------------------
    if refined_score > initial_score:
        print(f"\nImprovement detected: {initial_score} -> {refined_score}. Using refined response.")
        final_response = refined_response
        final_evaluation = refined_evaluation
    else:
        print(f"\nRefinement did not improve the score: {initial_score} -> {refined_score}. Keeping initial response.")
        final_response = initial_response
        final_evaluation = initial_evaluation

    return {
        "final_response": final_response,
        "final_evaluation": final_evaluation,
        "refined": True,
        "initial_evaluation": initial_evaluation,
        "refined_evaluation": refined_evaluation
    }


# ==========================================
# MAIN ASSISTANT FUNCTION
# ==========================================

def run_assistant(question, threshold=DEFAULT_THRESHOLD):

    print("\nGenerating initial response...")
    initial_response = generate_response(question)

    print("\nInitial Response")
    print("=" * 60)
    print(initial_response)

    result = adaptive_refinement(question, initial_response, threshold=threshold)

    print("\n")
    print("=" * 60)
    print("FINAL RESPONSE")
    print("=" * 60)
    print(result["final_response"])

    print("\nFinal Score:")
    print(f"{result['final_evaluation']['overall_score']}/10")

    print(f"\nRefinement Occurred: {result['refined']}")

    return result


# ==========================================
# TEST
# ==========================================

if __name__ == "__main__":

    question = input("\nEnter your question: ")

    run_assistant(question)
