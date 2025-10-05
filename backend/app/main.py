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
































# from fastapi import FastAPI, File, UploadFile
# from fastapi.middleware.cors import CORSMiddleware
# from PIL import Image
# from typing import List
# from .model import predict

# app = FastAPI(
#     title="Mango Leaf Disease Classifier",
#     description="Upload one or more images of mango leaves to classify their disease.",
#     version="2.0"
# )

# # -----------------------------
# # Allow Frontend (CORS)
# # -----------------------------
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # replace "*" with your frontend domain in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # -----------------------------
# # Predict Endpoint
# # -----------------------------
# @app.post("/predict")
# async def classify_images(files: List[UploadFile] = File(...)):
#     results = []
#     try:
#         for file in files:
#             image = Image.open(file.file).convert("RGB")
#             pred_class, confidence = predict(image)
#             results.append({
#                 "filename": file.filename,
#                 "class": pred_class,
#                 "confidence": round(confidence * 100, 2)
#             })
#         return {"predictions": results}
#     except Exception as e:
#         return {"error": str(e)}
