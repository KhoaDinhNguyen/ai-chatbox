from google import genai
import json
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generation(prompt, interaction_id=None):
    kwargs = {
        "model": "gemini-2.5-flash-lite",
        "input": prompt,
        "stream": True
    }

    if interaction_id:
        kwargs["previous_interaction_id"] = interaction_id


    stream = client.interactions.create(**kwargs)
  
    for event in stream:
        if event.event_type == "step.delta" and event.delta.type == "text":
            yield json.dumps({"type": "stream", "text": event.delta.text}) + "\n"
        elif event.event_type == "interaction.completed":
            yield json.dumps({"type": "done", "interactionId": event.interaction.id}) + "\n"
