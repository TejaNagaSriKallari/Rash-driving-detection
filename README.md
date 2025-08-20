## 🚗 Rash Driving Detection using CNN + LSTM  

This deep learning project detects rash driving behavior from CCTV footage using a combination of Convolutional Neural Network (CNN) and Long Short-Term Memory(LSTM) networks.
The system can also be accessed through a deployed MERN-based full-stack web applications.
Live Demo: [Rash Driving Detection App](https://rash-driving-setection.vercel.app/).

## 🧠 Model Summary  

- **CNN** → Extracts spatial features from each video frame  
- **LSTM** → Captures temporal driving behavior across frames  
- **Final Prediction** → Classifies driving as **"rash"** or **"normal"**  



## 📂 Dataset  

The dataset contains driving video clips categorized as:  

- `rash/` → Aggressive or unsafe driving  
- `normal/` → Smooth, safe driving  

---

## 📊 Results  

### 🔹 Example 1  

**Input Video**  
🎥 [truePositive.mp4](truePositive.mp4)  

**Prediction Result**  
![Result 1](https://github.com/TejaNagaSriKallari/Rash-driving-detection/raw/main/result1.png)  

---

### 🔹 Example 2  

**Input Video**  
🎥 [trueNegative.mp4](trueNegative.mp4)  

**Prediction Result**  
![Result 2](https://github.com/TejaNagaSriKallari/Rash-driving-detection/raw/main/result2.png)  

---

## ⚙️ How to Run (Locally)  

```bash
# Clone repository
git clone https://github.com/TejaNagaSriKallari/Rash-driving-detection.git
cd Rash-driving-detection

# Install dependencies
pip install tensorflow numpy opencv-python matplotlib
ou’d like to add improvements, please fork the repo and submit a PR.


#Backend Setup (Node.js + Express + ML)
cd rash-driving-backend
npm install
npm start

# Frontend Setup (React + Vite)
cd rash-driving-frontend
npm install
npm run dev
```

## 🌐 Web Application

To make the model accessible, a MERN-based full-stack web application was built:

Frontend (React + Vite + Tailwind) → Users can upload CCTV footage and view predictions.

Backend (Node.js + Express) → Handles video upload, connects with ML model, returns results.

Database (MongoDB Atlas) → Stores user activity & uploaded video records.

ML Model (TensorFlow CNN + LSTM) → Performs video classification in backend workflow.

## 🚀 Deployment

Frontend (Vercel) → https://rash-driving-detection.vercel.app/

Backend (Render) → https://rash-driving-detection-2.onrender.com

Database → MongoDB Atlas (cloud-hosted, private access)

✅ Workflow: Upload video on frontend → Sent to backend API → ML model processes → Result displayed instantly.

## 🛠️ Tech Stack

Frontend → React, Vite, TailwindCSS

Backend → Node.js, Express

Database → MongoDB Atlas

Machine Learning → TensorFlow (CNN + LSTM)

Deployment → Vercel (frontend), Render (backend), MongoDB Atlas (database)
