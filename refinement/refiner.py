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


REFINER_MODEL = "openai/gpt-oss-20b"


def refine_response(question, response, critique):

    issues = "\n".join(
        f"- {issue}"
        for issue in critique["main_issues"]
    )

    improvements = "\n".join(
        f"- {improvement}"
        for improvement in critique["improvements"]
    )

    refinement_prompt = f"""
You are an expert AI response editor.

Improve the original response using the critic's feedback.

USER QUESTION:
{question}

ORIGINAL RESPONSE:
{response}

CRITIC IDENTIFIED THESE ISSUES:
{issues}

RECOMMENDED IMPROVEMENTS:
{improvements}

CRITIQUE SUMMARY:
{critique["critique_summary"]}

Instructions:

1. Answer the original user question directly.
2. Correct any identified problems.
3. Add missing information identified by the critic.
4. Improve weak reasoning where necessary.
5. Improve clarity and structure.
6. Do not introduce unsupported claims.
7. Do not mention the critic, evaluator, or refinement process.
8. Do not explain what you changed.
9. Return ONLY the improved answer.
"""

    result = client.chat.completions.create(
        model=REFINER_MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert editor who improves "
                    "AI-generated responses."
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