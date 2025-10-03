from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from .model import predict

app = FastAPI(
    title="Mango Leaf Disease Classifier",
    description="Upload an image of a mango leaf to classify its disease.",
    version="1.0"
)

# -----------------------------
# Allow Frontend (CORS)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace "*" with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Predict Endpoint
# -----------------------------
@app.post("/predict")
async def classify_image(file: UploadFile = File(...)):
    try:
        image = Image.open(file.file).convert("RGB")
        pred_class = predict(image)
        return {"class": pred_class}
    except Exception as e:
        return {"error": str(e)}
