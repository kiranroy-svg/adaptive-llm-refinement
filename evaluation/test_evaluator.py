from evaluator import evaluate_response


question = "Explain overfitting in machine learning."

response = """
Overfitting occurs when a machine learning model learns the training
data too closely, including noise and irrelevant patterns. As a result,
the model performs very well on training data but poorly on unseen data.

For example, a decision tree that grows too deeply may memorize the
training examples instead of learning general patterns.
"""


evaluation = evaluate_response(
    question,
    response
)

print("\nEvaluation Result")
print("=" * 50)

print(f"Accuracy:       {evaluation['accuracy']}/10")
print(f"Completeness:   {evaluation['completeness']}/10")
print(f"Reasoning:      {evaluation['reasoning']}/10")
print(f"Clarity:        {evaluation['clarity']}/10")
print(f"Safety:         {evaluation['safety']}/10")
print(f"Overall Score:  {evaluation['overall_score']}/10")

print("\nFeedback:")
print(evaluation["feedback"])