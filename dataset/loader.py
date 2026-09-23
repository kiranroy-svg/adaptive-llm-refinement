import json
from pathlib import Path


def load_questions():
    file_path = Path(__file__).parent / "test_questions.json"

    with open(file_path, "r", encoding="utf-8") as file:
        questions = json.load(file)

    return questions


if __name__ == "__main__":
    questions = load_questions()

    print(f"Loaded {len(questions)} questions\n")

    for question in questions:
        print(
            f"{question['id']}. "
            f"[{question['category']}] "
            f"[{question['difficulty']}] "
            f"{question['question']}"
        )