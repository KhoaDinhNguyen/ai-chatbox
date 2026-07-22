from flask import Flask, request, Response, stream_with_context
import os
from flask_cors import CORS
from services import generation

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    prompt = data["prompt"]

    def stream():
        for json in generation(prompt):
            yield json

    return Response(stream_with_context(stream()), mimetype="text/plain")


if __name__ == "__main__":
    app.run()