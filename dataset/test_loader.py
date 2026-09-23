from loader import load_questions


def test_questions_loaded():
    questions = load_questions()

    assert len(questions) == 30


def test_required_fields():
    questions = load_questions()

    required_fields = {
        "id",
        "category",
        "difficulty",
        "question"
    }

    for question in questions:
        assert required_fields.issubset(question.keys())


def test_unique_ids():
    questions = load_questions()

    ids = [question["id"] for question in questions]

    assert len(ids) == len(set(ids))


if __name__ == "__main__":
    test_questions_loaded()
    test_required_fields()
    test_unique_ids()

    print("All dataset tests passed!")