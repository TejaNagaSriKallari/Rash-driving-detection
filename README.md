🚗 Rash Driving Detection using CNN + LSTM

This project detects rash driving behavior from dashcam videos using Deep Learning.
It combines Convolutional Neural Networks (CNN) to extract spatial features from video frames and Long Short-Term Memory (LSTM) networks to capture temporal dependencies, making it effective for video-based classification.

👉 Live Demo: Rash Driving Detection App

📌 Features

Upload dashcam video and get rash/normal classification.

CNN extracts frame-level spatial features.

LSTM models temporal patterns across consecutive frames.

Full-stack deployment with:

Frontend: React + Vite (deployed on Vercel)

Backend + ML model: Node.js + Express + MongoDB + TensorFlow (deployed on Render)

🧠 Model Summary

CNN → learns frame-level driving patterns (lane change, speed cues, etc.)

LSTM → analyzes sequence of frames for temporal behavior

Output → Binary classification:

rash 🚨 → Aggressive or unsafe driving

normal ✅ → Safe, smooth driving

📂 Dataset

The dataset contains dashcam video clips organized into two categories:

rash/ → Aggressive or unsafe driving

normal/ → Safe driving

Each video was split into frames before training.

📊 Results

Example Input Video 1
🎥 truePositive.mp4

🟢 Prediction: Rash Driving

Example Input Video 2
🎥 trueNegative.mp4

🟢 Prediction: Normal Driving

⚙️ Installation & Setup
🔹 Clone the repo
git clone https://github.com/TejaNagaSriKallari/Rash-driving-detection.git
cd Rash-driving-detection

🔹 Backend (Node.js + Express + MongoDB + ML Integration)
cd rash-driving-backend
npm install
npm start

🔹 Frontend (React + Vite)
cd rash-driving-frontend
npm install
npm run dev


App runs on:

Frontend → http://localhost:5173

Backend → http://localhost:3001

🛠️ Tech Stack

Deep Learning: TensorFlow, Keras, CNN, LSTM

Computer Vision: OpenCV, NumPy, Matplotlib

Backend: Node.js, Express, MongoDB, JWT Auth

Frontend: React, Vite, Tailwind CSS

Deployment: Render (backend + ML), Vercel (frontend)

🚀 Deployment

Frontend (React) → Vercel

Backend + ML (Node + TensorFlow) → Render

Database → MongoDB Atlas

🤝 Contributing

Pull requests are welcome! If you’d like to add improvements, please fork the repo and submit a PR.
