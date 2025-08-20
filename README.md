# 🚗 Rash Driving Detection using CNN + LSTM  

This deep learning project detects **rash driving behavior** from dashcam videos using a combination of **Convolutional Neural Networks (CNN)** and **Long Short-Term Memory (LSTM)** networks.  
The system can also be accessed through a deployed **MERN-based full-stack web application**.  

---

## 🧠 Model Summary  

- **CNN** → Extracts spatial features from each video frame  
- **LSTM** → Captures temporal driving behavior across frames  
- **Final Prediction** → Classifies driving as **"rash"** or **"normal"**  

---

## 📂 Dataset  

The dataset contains dashcam video clips categorized as:  

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
