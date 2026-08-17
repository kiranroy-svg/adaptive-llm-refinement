from critic import generate_critique


question = "Explain overfitting in machine learning."

response = """
Overfitting occurs when a machine learning model learns the training
data too closely. The model performs very well on training data but
poorly on unseen data.
"""


evaluation = {
    "accuracy": 10,
    "completeness": 5,
    "reasoning": 6,
    "clarity": 9,
    "safety": 10,
    "overall_score": 8.0,
    "feedback": (
        "The response is accurate and clear but lacks "
        "detail about causes, examples, and prevention."
    )
}


critique = generate_critique(
    question,
    response,
    evaluation
)


print("\nCritic Result")
print("=" * 60)

print("\nMain Issues:")

for issue in critique["main_issues"]:
    print(f"- {issue}")

print("\nImprovements:")

for improvement in critique["improvements"]:
    print(f"- {improvement}")

print("\nPriority:")
print(critique["priority"])

print("\nSummary:")
print(critique["critique_summary"])