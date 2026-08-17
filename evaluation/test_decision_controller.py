from decision_controller import decide_refinement


# Example evaluation result
evaluation = {
    "accuracy": 10,
    "completeness": 8,
    "reasoning": 7,
    "clarity": 9,
    "safety": 10,
    "overall_score": 5.4,
    "feedback": "The response is accurate but could be more complete."
}


decision = decide_refinement(evaluation)


print("\nDecision Result")
print("=" * 50)

print("Refinement Required:", decision["refinement_required"])
print("Reason:", decision["reason"])