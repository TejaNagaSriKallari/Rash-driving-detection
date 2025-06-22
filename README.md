# Rash Driving Detection using CNN + LSTM

This deep learning project detects rash driving behavior from dashcam videos using a combination of Convolutional Neural Networks (CNN) and Long Short-Term Memory (LSTM) networks. The model processes video frames and classifies the driving pattern as either "rash" or "normal".

## Model Summary

- CNN extracts spatial features from each frame.
- LSTM captures temporal driving behavior across frames.
- The final prediction indicates whether the input video shows rash driving.

## Dataset

The dataset contains dashcam video clips categorized as:
- `rash/` – Aggressive or unsafe driving
- `normal/` – Smooth, safe driving


## Results

🎬 **Example Input Video**  
[View example_video.mp4](truePositive.mp4)

📷 **Prediction Result (Image)**  
![Prediction Result](https://github.com/TejaNagaSriKallari/Rash-driving-detection/raw/main/result1.png)



## How to Run

```bash
git clone https://github.com/TejaNagaSriKallari/Rash-driving-detection.git
cd Rash-driving-detection
pip install tensorflow numpy opencv-python matplotlib


