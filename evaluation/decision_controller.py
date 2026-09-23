DEFAULT_THRESHOLD = 8.0


def decide_refinement(evaluation, threshold=DEFAULT_THRESHOLD):
    """
    Decides whether a response needs refinement.

    If overall_score >= threshold: response is good enough, return as-is.
    If overall_score < threshold: refinement is triggered.

    threshold is a parameter (not a hardcoded constant) so that
    experiments can run the exact same pipeline at different
    threshold values (e.g. 6, 7, 8, 9) without editing this file.
    """

    overall_score = evaluation["overall_score"]

    if overall_score >= threshold:
        return {
            "refinement_required": False,
            "reason": (
                f"Overall score {overall_score} meets or exceeds "
                f"the threshold {threshold}."
            )
        }

    return {
        "refinement_required": True,
        "reason": (
            f"Overall score {overall_score} is below "
            f"the threshold {threshold}."
        )
    }
