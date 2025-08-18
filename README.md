# ViT-based Framework for Multi-Class Classification of Mango Leaf Diseases

This project provides a Vision Transformer (ViT)-based framework for the multi-class classification of mango leaf diseases. It includes data preparation, model training, and evaluation pipelines, with support for multiple methods and disease categories.

---

## About the Dataset

**Description:**

- **Type of data:** 240x320 mango leaf images
- **Data format:** JPG
- **Number of images:** 4000 images (approx. 1800 distinct leaves; remainder augmented by zooming and rotating)
- **Diseases considered:** Seven diseases: Anthracnose, Bacterial Canker, Cutting Weevil, Die Back, Gall Midge, Powdery Mildew, Sooty Mould
- **Number of classes:** Eight (including healthy category)
- **Distribution:** Each category contains 500 images
- **Acquisition:** Images captured from mango trees using mobile phone cameras
- **Source locations:** Four mango orchards in Bangladesh:
  - Sher-e-Bangla Agricultural University orchard
  - Jahangir Nagar University orchard
  - Udaypur village mango orchard
  - Itakhola village mango orchard

**Applicability:**

- Suitable for distinguishing healthy vs. diseased leaves (binary classification)
- Suitable for differentiating among various diseases (multi-class classification)

**Citation:**  
If you use this dataset, please cite:

> Ali, Sawkat; Ibrahim, Muhammad; Ahmed, Sarder Iftekhar; Nadim, Md.; Mizanur, Mizanur Rahman; Shejunti, Maria Mehjabin; Jabid, Taskeed (2022), “MangoLeafBD Dataset”, Mendeley Data, V1, doi: [10.17632/hxsnvwty3r.1](https://doi.org/10.17632/hxsnvwty3r.1)

---

## Project Structure

- `EntirePipeline.ipynb`: Complete pipeline for data processing, training, and evaluation.
- `method1.ipynb`, `method2.ipynb`, `method3.ipynb`: Different approaches or models for disease classification.
- `sam.py`: Utility or helper script.
- `dataset/`: Contains subfolders for each disease class, with images of mango leaves.
- `requirements.txt`: Python dependencies for the project.
- `METHODS.jpg`: Visual summary of methods used.
- `.gitignore`: Specifies files and folders to be ignored by git.

## Getting Started

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
3. **Run the notebooks**
   - Open and execute `EntirePipeline.ipynb` or any method notebook in Jupyter.

## Requirements

See `requirements.txt` for all dependencies.

## Usage

- Use the provided notebooks to preprocess data, train models, and evaluate results.
- Customize or extend methods as needed for your research.

## License

This project is for academic and research purposes.

## Acknowledgements

- Vision Transformer (ViT) architecture
- MangoLeafBD Dataset

---

**Note:**  
This repository uses the official MangoLeafBD dataset. For any future use, please refer to the dataset description and citation above to avoid any issues regarding data provenance or usage rights.
