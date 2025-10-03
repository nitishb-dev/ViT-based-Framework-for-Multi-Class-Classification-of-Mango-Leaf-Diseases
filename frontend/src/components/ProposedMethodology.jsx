import React from 'react';

const steps = [
  "Data split into train, validation, and test sets.",
  "Augmentation and feature extraction using Swin Transformer.",
  "Synthetic data generated with Mixup.",
  "LoRA-adapted ViT head trained with SAM optimizer and PolyLoss.",
  "Evaluated on test set for accuracy and robustness."
];

const ProposedMethodology = () => (
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 bg-white rounded-2xl shadow-2xl border-l-8 border-green-500 flex flex-col items-center justify-center min-h-[60vh]">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">
      Proposed Methodology
    </h2>
    <ol className="list-decimal list-inside space-y-2 text-lg text-gray-700">
      {steps.map((step, idx) => (
        <li key={idx}>{step}</li>
      ))}
    </ol>
  </div>
);

export default ProposedMethodology;