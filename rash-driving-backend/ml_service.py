# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import subprocess
# import json
# import os
# import sys

# app = Flask(__name__)
# CORS(app)

# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.get_json(force=True)
#     video_path = data["videoPath"]

#     if not video_path or not os.path.exists(video_path):
#         return jsonify({"error": "Video path invalid or file not found"}), 400

#     try:
#         # Run your existing Python script
#         result = subprocess.run(
#             [sys.executable, "predict_rash.py", video_path],
#             capture_output=True,
#             text=True,
#             check=True
#         )
#         print(">>> STDOUT:", result.stdout)  # 👈 debug
#         print(">>> STDERR:", result.stderr)  # 👈 debug
#         # parse the JSON output from your script
#     #     output = json.loads(result.stdout)
#     #     return jsonify(output)
#     # except subprocess.CalledProcessError as e:
#     #     return jsonify({"error": "Prediction failed", "stderr": e.stderr,"stdout": e.stdout}), 500
#         raw_output = result.stdout.strip()

# # Find the first `{` and last `}`
#         start = raw_output.find("{")
#         end = raw_output.rfind("}") + 1
#         if start != -1 and end != -1:
#             json_str = raw_output[start:end]
#             output = json.loads(json_str)
#             return jsonify(output)
#         else:
#             return jsonify({"error": "Invalid output from model", "stdout": raw_output}), 500

# if __name__ == "__main__":
#     app.run(host="127.0.0.1", port=5000)







from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json
import os
import sys

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True)
    video_path = data.get("videoPath")

    if not video_path or not os.path.exists(video_path):
        return jsonify({"error": "Video path invalid or file not found"}), 400

    try:
        # Run your existing Python script
        result = subprocess.run(
            [sys.executable, "predict_rash.py", video_path],
            capture_output=True,
            text=True,
            check=True
        )

        print(">>> STDOUT:", result.stdout)   # 👈 debug
        print(">>> STDERR:", result.stderr)   # 👈 debug

        # Extract JSON from script output
        raw_output = result.stdout.strip()
        start = raw_output.find("{")
        end = raw_output.rfind("}") + 1

        if start != -1 and end != -1:
            json_str = raw_output[start:end]
            output = json.loads(json_str)
            output["filename"]=os.path.basename(video_path)
            return jsonify(output)
        else:
            return jsonify({
                "error": "Invalid output from model",
                "stdout": raw_output
            }), 500

    except subprocess.CalledProcessError as e:
        return jsonify({
            "error": "Prediction failed",
            "stderr": e.stderr,
            "stdout": e.stdout
        }), 500

    except json.JSONDecodeError as e:
        return jsonify({
            "error": "Invalid JSON parsing",
            "stdout": result.stdout,
            "stderr": result.stderr
        }), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
