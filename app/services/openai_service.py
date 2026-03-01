from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

def summarize_text(text: str)->str:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "Streszcaj w maksymalnie 2 zdaniach."
            },
            {
                "role": "user",
                "content": text
            }
        ],
        temperature=0.3
    )

    return response.choices[0].message.content