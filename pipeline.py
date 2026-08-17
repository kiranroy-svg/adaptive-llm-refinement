import os

from dotenv import load_dotenv
from openai import OpenAI

from evaluation.evaluator import evaluate_response
from evaluation.decision_controller import decide_refinement

from refinement.critic import generate_critique
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
# GENERATOR
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

def adaptive_refinement(
    question,
    initial_response,
    max_iterations=2
):

    current_response = initial_response

    history = []

    for iteration in range(max_iterations + 1):

        print(f"\n{'=' * 60}")
        print(f"ITERATION {iteration}")
        print(f"{'=' * 60}")

        # -------------------------------
        # Evaluate
        # -------------------------------

        print("\nEvaluating response...")

        evaluation = evaluate_response(
            question,
            current_response
        )

        score = evaluation["overall_score"]

        print(f"Overall Score: {score}/10")

        # -------------------------------
        # Store history
        # -------------------------------

        history.append({
            "iteration": iteration,
            "response": current_response,
            "evaluation": evaluation
        })

        # -------------------------------
        # Decision
        # -------------------------------

        decision = decide_refinement(evaluation)

        print(
            f"Refinement Required: "
            f"{decision['refinement_required']}"
        )

        print(
            f"Reason: {decision['reason']}"
        )

        # -------------------------------
        # Good enough
        # -------------------------------

        if not decision["refinement_required"]:

            print(
                "\nResponse meets quality requirements."
            )

            return {
                "final_response": current_response,
                "final_evaluation": evaluation,
                "iterations": iteration,
                "history": history
            }

        # -------------------------------
        # Maximum iterations
        # -------------------------------

        if iteration == max_iterations:

            print(
                "\nMaximum refinement iterations reached."
            )

            break

        # -------------------------------
        # Critic
        # -------------------------------

        print("\nGenerating critique...")

        critique = generate_critique(
            question,
            current_response,
            evaluation
        )

        print("\nCritique:")
        print(
            critique["critique_summary"]
        )

        # -------------------------------
        # Refiner
        # -------------------------------

        print(
            "\nGenerating refined response..."
        )

        refined_response = refine_response(
            question,
            current_response,
            critique
        )

        # -------------------------------
        # Re-evaluate refined response
        # -------------------------------

        print(
            "\nEvaluating refined response..."
        )

        refined_evaluation = evaluate_response(
            question,
            refined_response
        )

        refined_score = (
            refined_evaluation["overall_score"]
        )

        print(
            f"Refined Score: {refined_score}/10"
        )

        # -------------------------------
        # Compare
        # -------------------------------

        if refined_score > score:

            print(
                f"\nImprovement detected: "
                f"{score} → {refined_score}"
            )

            current_response = refined_response

            history.append({
                "iteration": iteration + 0.5,
                "response": refined_response,
                "evaluation": refined_evaluation,
                "critique": critique
            })

        else:

            print(
                f"\nRefinement did not improve "
                f"the score: {score} → {refined_score}"
            )

            print(
                "Keeping the previous response."
            )

            return {
                "final_response": current_response,
                "final_evaluation": evaluation,
                "iterations": iteration,
                "history": history
            }

    # -------------------------------
    # Select best response
    # -------------------------------

    best_entry = max(
        history,
        key=lambda item:
        item["evaluation"]["overall_score"]
    )

    return {
        "final_response": best_entry["response"],
        "final_evaluation": best_entry["evaluation"],
        "iterations": max_iterations,
        "history": history
    }


# ==========================================
# MAIN ASSISTANT FUNCTION
# ==========================================

def run_assistant(question):

    print("\nGenerating initial response...")

    initial_response = generate_response(
        question
    )

    print("\nInitial Response")
    print("=" * 60)
    print(initial_response)

    result = adaptive_refinement(
        question,
        initial_response,
        max_iterations=2
    )

    print("\n")
    print("=" * 60)
    print("FINAL RESPONSE")
    print("=" * 60)

    print(result["final_response"])

    print("\nFinal Score:")

    print(
        f"{result['final_evaluation']['overall_score']}/10"
    )

    print(
        f"\nRefinement Iterations: "
        f"{result['iterations']}"
    )

    return result


# ==========================================
# TEST
# ==========================================

if __name__ == "__main__":

    question = input(
        "\nEnter your question: "
    )

    run_assistant(question)