import os
import time
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY not found. Check your .env file.")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1"
)

question = input("\nEnter your question: ")

start_time = time.time()

response = client.responses.create(
    model="openai/gpt-oss-20b",
    input=question
)

end_time = time.time()

answer = response.output_text
latency = end_time - start_time

print("\n" + "=" * 60)
print("QUESTION")
print("=" * 60)
print(question)

print("\n" + "=" * 60)
print("GROQ RESPONSE")
print("=" * 60)
print(answer)

print("\n" + "=" * 60)
print("METRICS")
print("=" * 60)
print(f"Response Time: {latency:.2f} seconds")
#
