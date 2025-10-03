import React from "react";

const Introduction = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-8 border-green-500 flex flex-col items-center justify-center min-h-[70vh] animate-fade-in-up">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 text-center transition-colors duration-300">
        Introduction to Mango Leaf Disease Classification
      </h2>
      <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center max-w-4xl">
        Mango (Mangifera indica L.) is one of the most important fruit crops
        globally. However, its cultivation is severely threatened by various
        diseases. Early and accurate diagnosis of these diseases, often visible
        on the leaves, is crucial for effective treatment and minimizing yield
        loss. This system leverages a deep learning model to classify common
        mango leaf diseases from images, providing a rapid and non-destructive
        diagnostic tool.
      </p>
    </div>
  );
};

export default Introduction;
