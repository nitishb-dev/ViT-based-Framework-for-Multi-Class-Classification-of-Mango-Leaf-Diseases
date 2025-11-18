from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
from typing import List
from .model import predict
from .disease_data import get_disease_info

app = FastAPI(
    title="Mango Leaf Disease Classifier",
    description="Upload one or more images of mango leaves to classify their disease.",
    version="2.0"
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
# Root Endpoint
# -----------------------------
@app.get("/")
async def root():
    return {
        "message": "Mango Leaf Disease Classifier API",
        "status": "running",
        "version": "2.0"
    }

# -----------------------------
# Health Check Endpoint
# -----------------------------
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": True
    }

# -----------------------------
# Single Image Predict Endpoint
# -----------------------------
@app.post("/predict")
async def classify_image(file: UploadFile = File(...)):
    try:
        # Validate file type
        if not file.content_type.startswith("image/"):
            return {"error": "File must be an image (PNG, JPG, JPEG)"}
        
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        pred_class, confidence = predict(image)
        
        # Get detailed disease information
        disease_details = get_disease_info(pred_class)
        
        return {
            "class": pred_class,
            "confidence": round(confidence * 100, 2),
            "is_mango_leaf": pred_class != "Not a Mango Leaf",
            "details": disease_details
        }
    except Exception as e:
        return {"error": str(e)}

# -----------------------------
# Multiple Images Predict Endpoint
# -----------------------------
@app.post("/predict/batch")
async def classify_multiple_images(files: List[UploadFile] = File(...)):
    """
    Classify multiple mango leaf images in a single request.
    Returns predictions for all uploaded images.
    """
    if not files:
        return {"error": "No files uploaded"}
    
    if len(files) > 10:
        return {"error": "Maximum 10 images allowed per request"}
    
    results = []
    
    for idx, file in enumerate(files):
        try:
            # Validate file type
            if not file.content_type.startswith("image/"):
                results.append({
                    "filename": file.filename,
                    "error": "File must be an image (PNG, JPG, JPEG)",
                    "success": False
                })
                continue
            
            # Read and process image
            contents = await file.read()
            image = Image.open(io.BytesIO(contents)).convert("RGB")
            
            # Get prediction
            pred_class, confidence = predict(image)
            
            # Get detailed disease information
            disease_details = get_disease_info(pred_class)
            
            results.append({
                "filename": file.filename,
                "class": pred_class,
                "confidence": round(confidence * 100, 2),
                "is_mango_leaf": pred_class != "Not a Mango Leaf",
                "details": disease_details,
                "success": True
            })
            
        except Exception as e:
            results.append({
                "filename": file.filename,
                "error": f"Error processing image: {str(e)}",
                "success": False
            })
    
    return {
        "total_images": len(files),
        "successful": sum(1 for r in results if r.get("success", False)),
        "failed": sum(1 for r in results if not r.get("success", False)),
        "predictions": results
    }