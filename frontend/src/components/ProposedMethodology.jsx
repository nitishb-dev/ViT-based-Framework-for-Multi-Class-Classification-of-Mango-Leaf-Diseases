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
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Methodology
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            A systematic approach combining cutting-edge deep learning techniques 
            with rigorous validation for reliable disease classification.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative flex overflow-x-auto space-x-8 py-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-72 bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="inline-flex items-center justify-center w-6 h-6 bg-emerald-600 text-white text-xs font-bold rounded-full">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">{step.description}</p>
              <div className="flex flex-wrap gap-1">
                {step.details.map((d, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Architecture */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Technical Architecture
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "🧠", title: "Swin Transformer", desc: "Hierarchical vision transformer with shifted windows for efficient processing", bg: "blue-100" },
              { icon: "⚡", title: "LoRA Adaptation", desc: "Low-rank adaptation for efficient fine-tuning with minimal parameters", bg: "purple-100" },
              { icon: "🚀", title: "SAM Optimizer", desc: "Sharpness-aware minimization for improved generalization", bg: "green-100" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-all duration-300 text-center">
                <div className={`w-14 h-14 bg-${item.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Methodology;
