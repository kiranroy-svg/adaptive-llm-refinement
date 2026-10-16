import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY not found.")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1"
)

# Must be the SAME model as the initial generator in pipeline.py,
# because the initial LLM itself produces the refined response.
REFINER_MODEL = "qwen/qwen3.8-27b"

_DIMENSIONS = ["accuracy", "completeness", "reasoning", "clarity", "safety"]


def _build_feedback_block(evaluation):
    """
    Lists the judge's feedback with the WEAKEST dimensions first, so the
    generator sees the most important problems at the top.
    """

    items = sorted(
        (evaluation[d], d, evaluation[d + "_feedback"]) for d in _DIMENSIONS
    )

    return "\n".join(
        f"- {d.capitalize()} ({score}/10): {feedback}"
        for score, d, feedback in items
    )


def refine_response(question, previous_response, evaluation):
    """
    Sends the original query, the initial LLM's previous response, and
    the judge's per-metric feedback back to the SAME generator model and
    asks it to write a genuinely revised answer.
    """

    feedback_block = _build_feedback_block(evaluation)

    refinement_prompt = f"""You are revising your own earlier answer. An evaluator reviewed it
and listed specific weaknesses. Write a NEW, improved version of the
answer. Do not just copy the original.

ORIGINAL QUESTION:
{question}

YOUR EARLIER ANSWER:
{previous_response}

EVALUATOR FEEDBACK (weakest dimension first, each with a suggested fix):
{feedback_block}

Rules:
1. Apply every concrete suggestion in the feedback above. For each
   dimension that scored below 10, make at least one visible change
   to the answer that addresses it (add missing content, correct an
   error, strengthen the reasoning, or restructure for clarity).
2. Rewrite the parts the feedback criticizes. You may keep parts that
   were not criticized.
3. Do not introduce unsupported or invented claims.
4. Do not mention the evaluator, the scores, or this feedback.
5. Do not describe what you changed.
6. Return ONLY the improved answer.
"""

    result = client.chat.completions.create(
        model=REFINER_MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a helpful AI assistant that carefully revises "
                    "your own previous answers using reviewer feedback."
                )
            },
            {
                "role": "user",
                "content": refinement_prompt
            }
        ],
        temperature=0.4
    )

    return result.choices[0].message.content.strip()
