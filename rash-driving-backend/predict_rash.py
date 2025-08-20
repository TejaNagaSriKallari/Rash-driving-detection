# # import sys
# # import tensorflow as tf
# # from tensorflow.keras.models import load_model
# # import cv2
# # import numpy as np

# # # Get file path from Node.js
# # video_path = sys.argv[1]

# # # Load model
# # # model = load_model(r"C:/Users/91918/OneDrive/Desktop/rash-driving-app/rash-driving-backend/rash.keras")  # Replace with your model path
# # model = load_model("rash.keras")

# # # Function to preprocess video frames
# # def preprocess_frame(frame):
# #     frame = cv2.resize(frame, (128, 128))  # adjust to your model input
# #     frame = frame / 255.0
# #     return frame

# # # Read video and get frames
# # cap = cv2.VideoCapture(video_path)
# # frames = []
# # while True:
# #     ret, frame = cap.read()
# #     if not ret:
# #         break
# #     frames.append(preprocess_frame(frame))
# # cap.release()

# # # Convert to numpy array
# # frames = np.array(frames)
# # frames = np.expand_dims(frames, axis=0)  # batch dimension

# # # Predict
# # pred = model.predict(frames)
# # # Assuming binary classification: 1 = Rash, 0 = Normal
# # result = "Rash Driving" if pred[0][0] > 0.5 else "Normal Driving"

# # print(result)



# import sys
# import cv2
# import numpy as np
# from tensorflow.keras.models import load_model

# # =========================
# # Parameters
# # =========================
# MODEL_PATH = "rash.keras"     # path to your trained model
# IMG_SIZE = (128, 128)         # frame size used in training
# SEQUENCE_LENGTH = 15          # number of frames per video
# CHANNELS = 3                  

# # =========================
# # Get video path from Node.js
# # =========================
# if len(sys.argv) < 2:
#     print("Please provide video path as argument")
#     sys.exit(1)

# video_path = sys.argv[1]

# # =========================
# # Load model
# # =========================
# model = load_model(MODEL_PATH)

# # =========================
# # Preprocess frames
# # =========================
# def preprocess_frame(frame):
#     frame = cv2.resize(frame, IMG_SIZE)
#     frame = frame / 255.0
#     return frame

# # =========================
# # Read video frames
# # =========================
# cap = cv2.VideoCapture(video_path)
# frames = []

# while True:
#     ret, frame = cap.read()
#     if not ret:
#         break
#     frames.append(preprocess_frame(frame))
# cap.release()

# # =========================
# # Ensure exactly SEQUENCE_LENGTH frames
# # =========================
# if len(frames) < SEQUENCE_LENGTH:
#     # Pad with black frames
#     while len(frames) < SEQUENCE_LENGTH:
#         frames.append(np.zeros((IMG_SIZE[0], IMG_SIZE[1], CHANNELS)))
# elif len(frames) > SEQUENCE_LENGTH:
#     # Uniformly sample SEQUENCE_LENGTH frames
#     indices = np.linspace(0, len(frames)-1, SEQUENCE_LENGTH, dtype=int)
#     frames = [frames[i] for i in indices]

# # =========================
# # Convert to numpy array and add batch dimension
# # =========================
# frames = np.array(frames, dtype=np.float32)
# frames = np.expand_dims(frames, axis=0)  # shape: (1, 15, 128, 128, 3)

# # =========================
# # Predict
# # =========================
# pred = model.predict(frames)

# # Assuming binary classification: 1 = Rash, 0 = Normal
# result = "Rash Driving" if pred[0][0] > 0.5 else "Normal Driving"

# # Print result (Node.js will capture this)
# print(result)




import sys
import os
import cv2
import numpy as np
from tensorflow.keras.models import load_model
import json

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

MODEL_PATH = "rash.keras"
IMG_SIZE = (128, 128)
SEQUENCE_LENGTH = 15
CHANNELS = 3

if len(sys.argv) < 2:
    print(json.dumps({"error": "Please provide video path"}))
    sys.exit(1)

video_path = sys.argv[1]
model = load_model(MODEL_PATH)

def preprocess_frame(frame):
    frame = cv2.resize(frame, IMG_SIZE)
    frame = frame / 255.0
    return frame

cap = cv2.VideoCapture(video_path)
frames = []
while True:
    ret, frame = cap.read()
    if not ret:
        break
    frames.append(preprocess_frame(frame))
cap.release()

if len(frames) < SEQUENCE_LENGTH:
    while len(frames) < SEQUENCE_LENGTH:
        frames.append(np.zeros((IMG_SIZE[0], IMG_SIZE[1], CHANNELS)))
elif len(frames) > SEQUENCE_LENGTH:
    indices = np.linspace(0, len(frames)-1, SEQUENCE_LENGTH, dtype=int)
    frames = [frames[i] for i in indices]

frames = np.array(frames, dtype=np.float32)
frames = np.expand_dims(frames, axis=0)

pred = model.predict(frames)
result_text = "Rash Driving" if pred[0][0] > 0.5 else "Normal Driving"
confidence = float(pred[0][0])

print(json.dumps({"result": result_text, "confidence": confidence}), flush=True)
