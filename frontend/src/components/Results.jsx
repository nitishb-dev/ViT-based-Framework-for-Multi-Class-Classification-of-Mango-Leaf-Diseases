import React from "react";

const overall = {
  accuracy: 0.99,
  precision: 0.99,
  recall: 0.99,
  f1: 0.99,
};

const Results = () => (
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-8 border-green-500 flex flex-col items-center justify-center min-h-[70vh] animate-fade-in-up">
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center">
      Model Performance
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-lg mb-4 w-full max-w-4xl">
      <div className="bg-green-50 rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-1 hover:bg-green-100 transition-all duration-300 text-center">
        <div className="font-semibold text-green-800">Accuracy</div>
        <div className="text-3xl font-bold text-green-600">
          {overall.accuracy}
        </div>
      </div>
      <div className="bg-green-50 rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-1 hover:bg-green-100 transition-all duration-300 text-center">
        <div className="font-semibold text-green-800">Precision</div>
        <div className="text-3xl font-bold text-green-600">
          {overall.precision}
        </div>
      </div>
      <div className="bg-green-50 rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-1 hover:bg-green-100 transition-all duration-300 text-center">
        <div className="font-semibold text-green-800">Recall</div>
        <div className="text-3xl font-bold text-green-600">
          {overall.recall}
        </div>
      </div>
      <div className="bg-green-50 rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-1 hover:bg-green-100 transition-all duration-300 text-center">
        <div className="font-semibold text-green-800">F1-score</div>
        <div className="text-3xl font-bold text-green-600">{overall.f1}</div>
      </div>
    </div>
    <div className="mt-4 text-gray-500 text-center text-sm">
      <i>High performance achieved on all metrics across 8 classes.</i>
    </div>
  </div>
);

export default Results;
