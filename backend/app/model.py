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
        pred_idx = torch.argmax(logits, dim=1).item()
    return CLASS_NAMES[pred_idx]
























# import torch
# import torch.nn as nn
# import timm
# from torchvision import transforms
# from PIL import Image

# # -----------------------------
# # LoRA Linear + ViT Head
# # -----------------------------
# class LoRALinear(nn.Module):
#     def __init__(self, in_features, out_features, r=16):
#         super().__init__()
#         self.linear = nn.Linear(in_features, out_features, bias=False)
#         self.lora_a = nn.Linear(in_features, r, bias=False)
#         self.lora_b = nn.Linear(r, out_features, bias=False)

#     def forward(self, x):
#         return self.linear(x) + self.lora_b(self.lora_a(x))

# class ViTHead(nn.Module):
#     def __init__(self, in_features, num_classes, dropout_rate=0.2):
#         super().__init__()
#         self.dropout = nn.Dropout(dropout_rate)
#         self.head = LoRALinear(in_features, num_classes, r=16)

#     def forward(self, x):
#         if x.dim() == 1:
#             x = x.unsqueeze(0)
#             return self.head(self.dropout(x)).squeeze(0)
#         return self.head(self.dropout(x))

# # -----------------------------
# # Load Feature Extractor
# # -----------------------------
# IMG_SIZE = 224
# model_name = 'swin_tiny_patch4_window7_224'
# feature_model = timm.create_model(model_name, pretrained=True, num_classes=0)
# feature_model.eval()

# # -----------------------------
# # Load Trained ViT Head
# # -----------------------------
# in_features = feature_model.num_features
# num_classes = 8
# model_head = ViTHead(in_features=in_features, num_classes=num_classes)
# model_head.load_state_dict(
#     torch.load(
#         r"E:\ViT-based-Framework-for-Multi-Class-Classification-of-Mango-Leaf-Diseases\saved_models\ds.pth",
#         map_location="cpu"
#     )
# )
# model_head.eval()

# # -----------------------------
# # Class Names
# # -----------------------------
# CLASS_NAMES = [
#     'Anthracnose', 'Bacterial Canker', 'Cutting Weevil', 'Die Back',
#     'Gall Midge', 'Healthy', 'Powdery Mildew', 'Sooty Mould'
# ]

# # -----------------------------
# # Image Transform
# # -----------------------------
# val_transform = transforms.Compose([
#     transforms.Resize((IMG_SIZE, IMG_SIZE)),
#     transforms.ToTensor(),
#     transforms.Normalize([0.5]*3, [0.5]*3)
# ])

# # -----------------------------
# # Predict Function
# # -----------------------------
# def predict(image: Image.Image):
#     x = val_transform(image).unsqueeze(0)
#     with torch.no_grad():
#         feat = feature_model(x)
#         logits = model_head(feat)
#         probs = torch.softmax(logits, dim=1)
#         pred_idx = torch.argmax(probs, dim=1).item()
#         confidence = probs[0, pred_idx].item()
#     return CLASS_NAMES[pred_idx], confidence
