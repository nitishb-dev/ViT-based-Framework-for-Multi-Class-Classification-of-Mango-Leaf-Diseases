import torch
import torch.nn as nn
import timm
from torchvision import transforms
from PIL import Image

# -----------------------------
# LoRA Linear + ViT Head
# -----------------------------
class LoRALinear(nn.Module):
    def __init__(self, in_features, out_features, r=16):
        super().__init__()
        self.linear = nn.Linear(in_features, out_features, bias=False)
        self.lora_a = nn.Linear(in_features, r, bias=False)
        self.lora_b = nn.Linear(r, out_features, bias=False)

    def forward(self, x):
        return self.linear(x) + self.lora_b(self.lora_a(x))

class ViTHead(nn.Module):
    def __init__(self, in_features, num_classes, dropout_rate=0.2):
        super().__init__()
        self.dropout = nn.Dropout(dropout_rate)
        self.head = LoRALinear(in_features, num_classes, r=16)

    def forward(self, x):
        if x.dim() == 1:
            x = x.unsqueeze(0)
            return self.head(self.dropout(x)).squeeze(0)
        return self.head(self.dropout(x))

# -----------------------------
# Load Feature Extractor
# -----------------------------
IMG_SIZE = 224
model_name = 'swin_tiny_patch4_window7_224'
feature_model = timm.create_model(model_name, pretrained=True, num_classes=0)
feature_model.eval()

# -----------------------------
# Load Trained ViT Head
# -----------------------------
in_features = feature_model.num_features
num_classes = 8  # Replace with your number of classes
model_head = ViTHead(in_features=in_features, num_classes=num_classes)
model_head.load_state_dict(torch.load("E:\ViT-based-Framework-for-Multi-Class-Classification-of-Mango-Leaf-Diseases\saved_models\ds.pth", map_location="cpu"))
model_head.eval()

# -----------------------------
# Class Names
# -----------------------------
CLASS_NAMES = ['Anthracnose', 'Bacterial Canker', 'Cutting Weevil', 'Die Back', 'Gall Midge', 'Healthy', 'Powdery Mildew', 'Sooty Mould']

# -----------------------------
# Image Transform
# -----------------------------
val_transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize([0.5]*3, [0.5]*3)
])

# -----------------------------
# Predict Function
# -----------------------------
def predict(image: Image.Image):
    x = val_transform(image).unsqueeze(0)
    with torch.no_grad():
        feat = feature_model(x)
        logits = model_head(feat)
        probs = torch.softmax(logits, dim=1)
        confidence, pred_idx = torch.max(probs, dim=1)
        confidence = confidence.item()
        pred_idx = pred_idx.item()
        
        # Calculate entropy to measure prediction uncertainty
        # High entropy = predictions spread uniformly = likely not a mango leaf
        entropy = -torch.sum(probs * torch.log(probs + 1e-10)).item()
        
        # Get the distribution of predictions
        top2_probs, _ = torch.topk(probs, min(2, len(CLASS_NAMES)), dim=1)
        top2_diff = (top2_probs[0][0] - top2_probs[0][1]).item() if len(top2_probs[0]) > 1 else 1.0
    
    # Validation logic - Multi-criteria approach:
    # Use BOTH entropy and confidence together for better discrimination
    
    # 1. Very high entropy (> 1.9) = model is completely confused = not a mango leaf
    if entropy > 1.9:
        return "Not a Mango Leaf", confidence
    
    # 2. Combined check: Low confidence AND high entropy = not a mango leaf
    #    This catches non-mango leaves while allowing mango leaves with moderate confidence
    if confidence < 0.25 and entropy > 1.5:
        return "Not a Mango Leaf", confidence
    
    # 3. Very low confidence (< 18%) = definitely not a mango leaf
    if confidence < 0.18:
        return "Not a Mango Leaf", confidence
    
    # 4. Low-moderate confidence with very close top 2 predictions = uncertain
    if confidence < 0.30 and top2_diff < 0.08:
        return "Not a Mango Leaf", confidence
    
    # Otherwise, trust the model's prediction
    # This accepts mango leaves even with 18-30% confidence if entropy is reasonable
    return CLASS_NAMES[pred_idx], confidence
