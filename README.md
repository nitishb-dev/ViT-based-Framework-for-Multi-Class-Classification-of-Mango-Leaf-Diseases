# 🥭 MangoLeaf AI - Disease Classification System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com/)
[![Accuracy](https://img.shields.io/badge/Accuracy-99.3%25-brightgreen.svg)](https://github.com/yourusername/mango-leaf-disease-classifier)

An advanced AI-powered web application for real-time mango leaf disease classification using state-of-the-art deep learning techniques. Built with Swin Transformer architecture and LoRA adaptation for superior accuracy and efficiency.

<img width="940" height="438" alt="image" src="https://github.com/user-attachments/assets/334a4fe4-6a1f-4976-9da3-b3f5923bb21f" />

<img width="940" height="531" alt="image" src="https://github.com/user-attachments/assets/4b4870d4-04cd-4c77-be60-396f0c34126e" />

## 🌟 Features

- **🎯 High Accuracy**: 99.3% classification accuracy across 8 disease classes
- **⚡ Real-time Processing**: Results in under 2 seconds
- **🧠 Advanced AI**: Swin Transformer with LoRA adaptation
- **📱 Responsive Design**: Works seamlessly on all devices
- **🎨 Modern UI**: Clean, intuitive interface built with React and Tailwind CSS
- **🔄 Drag & Drop**: Easy image upload with preview
- **📊 Detailed Results**: Disease information and treatment recommendations
- **🚀 Fast API**: High-performance backend with FastAPI

## 🦠 Supported Disease Classes

1. **Healthy** - No disease detected
2. **Anthracnose** - Fungal disease causing dark lesions
3. **Bacterial Canker** - Bacterial infection with cankers
4. **Cutting Weevil** - Pest damage from weevil larvae
5. **Die Back** - Progressive dying of shoots and branches
6. **Gall Midge** - Insect pest causing galls
7. **Powdery Mildew** - White powdery fungal coating
8. **Sooty Mould** - Black fungal growth on surfaces

## 🏗️ Architecture

### Backend
- **Framework**: FastAPI for high-performance API
- **Model**: Swin Transformer (Vision Transformer)
- **Optimization**: LoRA (Low-Rank Adaptation) for efficient fine-tuning
- **Training**: SAM optimizer with PolyLoss function
- **Data Augmentation**: Mixup technique for improved generalization

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS for modern, responsive design
- **Icons**: Heroicons for consistent iconography
- **State Management**: React hooks for efficient state handling
- **File Upload**: Drag-and-drop with preview functionality

## 📊 Performance Metrics

| Metric | Score |
|--------|-------|
| **Accuracy** | 99.33% |
| **Precision** | 99.34% |
| **Recall** | 99.34% |
| **F1-Score** | 99.34% |
| **Processing Time** | <2 seconds |
| **Model Size** | Optimized with LoRA |

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mango-leaf-disease-classifier.git
   cd mango-leaf-disease-classifier
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Download the trained model**
   ```bash
   # Place your trained model file in the models/ directory
   # Model file should be named: swin_transformer_lora_model.pth
   ```

5. **Start the FastAPI server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
mango-leaf-disease-classifier/
├── backend/          
│   ├── app/
│   │   ├── model.py           # Model architecture
│   │   └── main.py            # FastAPI application
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── ProposedMethodology.jsx
│   │   │   ├── Predictor.jsx
│   │   │   ├── Results.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
├── saved_models/
│   ├── ds.pth
├── notebooks/
│   ├── finalHEAD.ipynb
│   ├── requirements.txt
│   └── sam.py
└── README.md
```

## 🔬 Methodology

### 1. Data Preparation
- Comprehensive dataset preprocessing
- Train/validation/test splits (70/15/15)
- Image normalization and quality filtering

### 2. Feature Engineering
- Advanced data augmentation techniques
- Rotation, scaling, and color augmentation
- Swin Transformer feature extraction

### 3. Data Synthesis
- Mixup augmentation for improved generalization
- Synthetic sample generation
- Distribution balancing across classes

### 4. Model Training
- **Architecture**: Swin Transformer (Vision Transformer)
- **Adaptation**: LoRA (Low-Rank Adaptation)
- **Optimizer**: SAM (Sharpness-Aware Minimization)
- **Loss Function**: PolyLoss for better convergence

### 5. Evaluation
- Comprehensive testing on held-out test set
- Cross-validation for robustness
- Performance metrics across all classes

## 🛠️ API Endpoints

### POST `/predict`
Upload an image for disease classification.

**Request:**
- `file`: Image file (PNG, JPG, JPEG)
- Max file size: 10MB

**Response:**
```json
{
  "class": "Anthracnose",
  "confidence": 0.987,
  "processing_time": 1.23
}
```

### GET `/health`
Check API health status.

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

## 🎨 UI Components

- **Hero Section**: Compelling landing with key metrics
- **About**: Project overview and feature highlights
- **Methodology**: Technical approach visualization
- **Predictor**: Interactive diagnosis interface
- **Results**: Performance metrics and validation
- **Responsive Design**: Mobile-first approach

## 🙏 Acknowledgments

- **Research Community**: For advancing Vision Transformer architectures
- **Swin Transformer**: Microsoft Research for the base architecture
- **LoRA**: Microsoft Research for Low-Rank Adaptation technique
- **FastAPI**: For the excellent web framework
- **React Community**: For the robust frontend ecosystem

## 🔮 Future Enhancements

- [ ] Mobile app development (React Native)
- [ ] Multi-language support
- [ ] Batch processing for multiple images
- [ ] Integration with agricultural databases
- [ ] Real-time monitoring dashboard
- [ ] Treatment recommendation system
- [ ] Farmer community features

---
