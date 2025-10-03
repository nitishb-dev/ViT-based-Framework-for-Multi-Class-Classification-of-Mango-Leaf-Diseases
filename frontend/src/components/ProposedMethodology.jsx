import React from "react";

const steps = [
  {
    title: "Data Preparation",
    description: "Data split into train, validation, and test sets.",
  },
  {
    title: "Feature Engineering",
    description: "Augmentation and feature extraction using Swin Transformer.",
  },
  {
    title: "Data Synthesis",
    description:
      "Synthetic data generated with Mixup for improved generalization.",
  },
  {
    title: "Model Training",
    description:
      "LoRA-adapted ViT head trained with SAM optimizer and PolyLoss.",
  },
  {
    title: "Evaluation",
    description: "Model evaluated on the test set for accuracy and robustness.",
  },
];

const ProposedMethodology = () => (
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-8 border-green-500 flex flex-col items-center justify-center min-h-[70vh] animate-fade-in-up">
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center">
      Proposed Methodology
    </h2>
    <ol className="relative border-l border-gray-200 dark:border-gray-700 w-full max-w-2xl">
      {steps.map((step, idx) => (
        <li key={idx} className="mb-10 ml-6 group">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-green-100 rounded-full -left-4 ring-8 ring-white group-hover:bg-green-200 transition-colors">
            <span className="font-bold text-green-700">{idx + 1}</span>
          </span>
          <h3 className="flex items-center mb-1 text-xl font-semibold text-gray-900">
            {step.title}
          </h3>
          <p className="text-base font-normal text-gray-500">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  </div>
);

export default ProposedMethodology;
