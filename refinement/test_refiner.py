from refiner import refine_response


question = "Explain overfitting in machine learning."

response = """
Overfitting occurs when a machine learning model learns the training
data too closely. The model performs very well on training data but
poorly on unseen data.
"""


critique = {
    "main_issues": [
        "The response does not explain why overfitting occurs.",
        "It does not provide a concrete example.",
        "It does not mention ways to prevent overfitting."
    ],
    "improvements": [
        "Explain how excessive model complexity can cause overfitting.",
        "Add a simple decision-tree example.",
        "Mention techniques such as regularization and cross-validation."
    ],
    "priority": "medium",
    "critique_summary": (
        "The response is accurate and clear but lacks "
        "important supporting details."
    )
}


refined_response = refine_response(
    question,
    response,
    critique
)


print("\nOriginal Response")
print("=" * 60)
print(response)

print("\nRefined Response")
print("=" * 60)
print(refined_response)