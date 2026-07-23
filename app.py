import traceback
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Create Gemini client
client = genai.Client(
    api_key=os.getenv("GOOGLE_API_KEY")
)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()

    question = data.get("question")

    if not question:
        return jsonify({"error": "Question is required"}), 400

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=question
        )

        return jsonify({
            "answer": response.text
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)