import os
import json

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


CRITIC_MODEL = "openai/gpt-oss-20b"


def generate_critique(question, response, evaluation):

    weak_dimensions = []

    dimensions = {
        "accuracy": evaluation["accuracy"],
        "completeness": evaluation["completeness"],
        "reasoning": evaluation["reasoning"],
        "clarity": evaluation["clarity"],
        "safety": evaluation["safety"]
    }

    for dimension, score in dimensions.items():
        if score < 6:
            weak_dimensions.append(dimension)

    critique_prompt = f"""
You are a critical reviewer of an AI-generated response.

Your task is to identify specific weaknesses in the response
and explain how the response can be improved.

USER QUESTION:
{question}

CURRENT RESPONSE:
{response}

EVALUATION SCORES:
Accuracy: {evaluation["accuracy"]}/10
Completeness: {evaluation["completeness"]}/10
Reasoning: {evaluation["reasoning"]}/10
Clarity: {evaluation["clarity"]}/10
Safety: {evaluation["safety"]}/10
Overall Score: {evaluation["overall_score"]}/10

Evaluator Feedback:
{evaluation["feedback"]}

Weak dimensions:
{weak_dimensions}

Analyze the response carefully.

Identify:
1. Missing information
2. Incorrect or questionable information
3. Weak reasoning or explanations
4. Clarity or structure problems
5. Specific improvements that should be made

Do not rewrite the entire answer.

Return ONLY valid JSON in this format:

{{
    "main_issues": [
        "issue 1",
        "issue 2"
    ],
    "improvements": [
        "improvement 1",
        "improvement 2"
    ],
    "priority": "low/medium/high",
    "critique_summary": "brief summary of the main weaknesses"
}}
"""

    result = client.chat.completions.create(
        model=CRITIC_MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a strict and constructive critic "
                    "of AI-generated responses."
                )
            },
            {
                "role": "user",
                "content": critique_prompt
            }
        ],
        temperature=0
    )

    critique_text = result.choices[0].message.content

    try:
        critique = json.loads(critique_text)
    except json.JSONDecodeError:
        raise ValueError(
            f"Critic returned invalid JSON:\n{critique_text}"
        )

    return critique