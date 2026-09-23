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

# Same model as the initial generator, since the initial LLM
# itself is the one producing the refined response.
REFINER_MODEL = "openai/gpt-oss-20b"


def _build_feedback_block(evaluation):
    """
    Turns the judge's per-metric scores and feedback into a
    readable block of text to hand back to the generator LLM.
    """

    return f"""Accuracy ({evaluation['accuracy']}/10): {evaluation['accuracy_feedback']}
Completeness ({evaluation['completeness']}/10): {evaluation['completeness_feedback']}
Reasoning ({evaluation['reasoning']}/10): {evaluation['reasoning_feedback']}
Clarity ({evaluation['clarity']}/10): {evaluation['clarity_feedback']}
Safety ({evaluation['safety']}/10): {evaluation['safety_feedback']}"""


def refine_response(question, previous_response, evaluation):
    """
    Sends the original query, the initial LLM's own previous
    response, and the judge's per-metric feedback back to the
    SAME generator model, and asks it to produce an improved
    response.

    This replaces a separate critic step: the judge's feedback
    goes straight back to the generator LLM instead of being
    rewritten into issues/improvements by a third model first.
    """

    feedback_block = _build_feedback_block(evaluation)

    refinement_prompt = f"""You previously answered the question below. An evaluator has
scored your answer on five dimensions and given feedback on each.
Use this feedback to write an improved answer.

ORIGINAL QUESTION:
{question}

YOUR ORIGINAL ANSWER:
{previous_response}

EVALUATOR FEEDBACK (score / reason for each dimension):
{feedback_block}

Instructions:
1. Answer the original question directly.
2. Address the specific weaknesses mentioned in the feedback above.
3. Do not introduce unsupported claims.
4. Do not mention the evaluator, the scores, or this feedback in your answer.
5. Do not explain what you changed.
6. Return ONLY the improved answer.
"""

    result = client.chat.completions.create(
        model=REFINER_MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a helpful AI assistant revising your own "
                    "previous answer based on evaluator feedback."
                )
            },
            {
                "role": "user",
                "content": refinement_prompt
            }
        ],
        temperature=0.2
    )

    refined_response = result.choices[0].message.content

    return refined_response.strip()
