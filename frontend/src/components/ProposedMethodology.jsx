import React from "react";
import { 
  DocumentTextIcon,
  CogIcon,
  BeakerIcon,
  AcademicCapIcon,
  ChartBarIcon 
} from "@heroicons/react/24/outline";

const steps = [
  {
    icon: DocumentTextIcon,
    title: "Data Preparation",
    description: "Comprehensive dataset preprocessing with train/validation/test splits and quality assurance.",
    details: ["Image normalization", "Dataset balancing", "Quality filtering"]
  },
  {
    icon: CogIcon,
    title: "Feature Engineering",
    description: "Advanced data augmentation and feature extraction using Swin Transformer architecture.",
    details: ["Rotation & scaling", "Color augmentation", "Swin Transformer features"]
  },
  {
    icon: BeakerIcon,
    title: "Data Synthesis",
    description: "Synthetic data generation with Mixup technique for enhanced model generalization.",
    details: ["Mixup augmentation", "Synthetic samples", "Distribution balancing"]
  },
  {
    icon: AcademicCapIcon,
    title: "Model Training",
    description: "LoRA-adapted Vision Transformer training with SAM optimizer and PolyLoss function.",
    details: ["LoRA adaptation", "SAM optimization", "PolyLoss function"]
  },
  {
    icon: ChartBarIcon,
    title: "Evaluation",
    description: "Comprehensive model evaluation on test set for accuracy, precision, recall, and F1-score.",
    details: ["Performance metrics", "Cross-validation", "Robustness testing"]
  },
];

const Methodology = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Methodology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A systematic approach combining cutting-edge deep learning techniques 
            with rigorous validation for reliable disease classification.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-600 text-white text-sm font-bold rounded-full">
                      {index + 1}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {step.details.map((detail, detailIndex) => (
                      <span 
                        key={detailIndex}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Architecture */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Technical Architecture
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Swin Transformer</h4>
              <p className="text-sm text-gray-600">Hierarchical vision transformer with shifted windows for efficient processing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">LoRA Adaptation</h4>
              <p className="text-sm text-gray-600">Low-rank adaptation for efficient fine-tuning with minimal parameters</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">SAM Optimizer</h4>
              <p className="text-sm text-gray-600">Sharpness-aware minimization for improved generalization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Methodology;
