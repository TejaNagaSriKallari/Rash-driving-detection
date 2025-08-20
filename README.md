🚗 Rash Driving Detection using CNN + LSTM

This deep learning project detects rash driving behavior from dashcam videos using a combination of Convolutional Neural Networks (CNN) and Long Short-Term Memory (LSTM) networks. The model processes video frames and classifies the driving pattern as either "rash" or "normal".

👉 Live Demo: Rash Driving Detection App

🧠 Model Summary

CNN → extracts spatial features from each frame

LSTM → captures temporal driving behavior across frames

Final Prediction → outputs whether the video shows rash or normal driving

📂 Dataset

The dataset contains dashcam video clips categorized as:

rash/ – Aggressive or unsafe driving

normal/ – Smooth, safe driving

Each video was converted into frames for training.

📊 Results
✅ Example 1

Input Video
🎥 truePositive.mp4

Prediction Result


✅ Example 2

Input Video
🎥 trueNegative.mp4

Prediction Result


⚙️ How to Run
🔹 Clone the Repository
git clone https://github.com/TejaNagaSriKallari/Rash-driving-detection.git
cd Rash-driving-detection

🔹 Backend Setup (Node.js + Express + ML)
cd rash-driving-backend
npm install
npm start

🔹 Frontend Setup (React + Vite)
cd rash-driving-frontend
npm install
npm run dev


Frontend runs at → http://localhost:5173

Backend runs at → http://localhost:3001

🛠️ Tech Stack

Deep Learning: TensorFlow, Keras, CNN, LSTM

Computer Vision: OpenCV, NumPy, Matplotlib

Backend: Node.js, Express.js, MongoDB, JWT Auth

Frontend: React, Vite, Tailwind CSS

Deployment:

Frontend → Vercel

Backend + ML → Render

Database → MongoDB Atlas
Pull requests are welcome! If you’d like to add improvements, please fork the repo and submit a PR.
