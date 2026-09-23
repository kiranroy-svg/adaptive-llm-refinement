from refiner import refine_response


question = "Explain overfitting in machine learning."

response = """
Overfitting occurs when a machine learning model learns the training
data too closely. The model performs very well on training data but
poorly on unseen data.
"""

# This mimics what evaluator.evaluate_response() would return.
evaluation = {
    "accuracy": 10,
    "accuracy_feedback": "The core definition given is correct.",
    "completeness": 5,
    "completeness_feedback": "Does not explain why overfitting happens, does not give a concrete example, and does not mention prevention techniques.",
    "reasoning": 6,
    "reasoning_feedback": "The explanation is stated but not justified with any underlying cause.",
    "clarity": 9,
    "clarity_feedback": "The answer is short and easy to read.",
    "safety": 10,
    "safety_feedback": "No safety concerns.",
    "overall_score": 8.0
}


refined_response = refine_response(
    question,
    response,
    evaluation
)


print("\nOriginal Response")
print("=" * 60)
print(response)

print("\nRefined Response")
print("=" * 60)
print(refined_response)
