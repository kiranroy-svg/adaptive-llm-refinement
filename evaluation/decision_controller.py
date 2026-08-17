REFINEMENT_THRESHOLD = 8.0
DIMENSION_THRESHOLD = 6.0


def decide_refinement(evaluation):

    overall_score = evaluation["overall_score"]

    dimensions = {
        "accuracy": evaluation["accuracy"],
        "completeness": evaluation["completeness"],
        "reasoning": evaluation["reasoning"],
        "clarity": evaluation["clarity"],
        "safety": evaluation["safety"]
    }

    weak_dimensions = [
        dimension
        for dimension, score in dimensions.items()
        if score < DIMENSION_THRESHOLD
    ]

    if overall_score < REFINEMENT_THRESHOLD:

        return {
            "refinement_required": True,
            "reason": (
                f"Overall score {overall_score} is below "
                f"the threshold {REFINEMENT_THRESHOLD}."
            ),
            "weak_dimensions": weak_dimensions
        }

    if weak_dimensions:

        return {
            "refinement_required": True,
            "reason": (
                f"The response has weak dimensions: "
                f"{', '.join(weak_dimensions)}."
            ),
            "weak_dimensions": weak_dimensions
        }

    return {
        "refinement_required": False,
        "reason": (
            f"Response quality is acceptable. "
            f"Overall score: {overall_score}."
        ),
        "weak_dimensions": []
    }