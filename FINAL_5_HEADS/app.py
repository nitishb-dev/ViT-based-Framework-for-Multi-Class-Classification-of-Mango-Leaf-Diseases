from flask import Flask, render_template, request
import torch
import timm
from PIL import Image
import numpy as np
import os
from torchvision import transforms
from model import ViTHead  # import your ViT head class

app = Flask(__name__)

# Load feature extractor
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
feature_model = timm.create_model('swin_tiny_patch4_window7_224', pretrained=True, num_classes=0).to(device).eval()

# Load classification head
CLASS_NAMES = ["Anthracnose", "Bacterial Canker", "Cutting Weevil", "Die Back", 
               "Gall Midge", "Healthy", "Powdery Mildew", "Sooty Mould"]

model_head = ViTHead(in_features=feature_model.num_features, num_classes=len(CLASS_NAMES))
model_head.load_state_dict(torch.load("model/ds1.pth", map_location=device))
model_head.eval().to(device)

# Image transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.5]*3, [0.5]*3)
])

def predict_image(img_path):
    img = Image.open(img_path).convert("RGB")
    x = transform(img).unsqueeze(0).to(device)
    with torch.no_grad():
        feat = feature_model(x)
        logits = model_head(feat)
        probs = torch.softmax(logits, dim=1).cpu().numpy()[0]
    pred_class = CLASS_NAMES[np.argmax(probs)]
    return pred_class, probs

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        f = request.files["file"]
        path = os.path.join("static", f.filename)
        f.save(path)
        pred, probs = predict_image(path)
        return render_template("result.html", img=path, pred=pred, probs=zip(CLASS_NAMES, probs))
    return render_template("upload.html")

if __name__ == "__main__":
    app.run(debug=True)
