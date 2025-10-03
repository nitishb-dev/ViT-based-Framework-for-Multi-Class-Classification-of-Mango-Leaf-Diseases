import React from 'react';

const overall = {
  accuracy: 0.99,
  precision: 0.99,
  recall: 0.99,
  f1: 0.99,
};

const Results = () => (
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 bg-white rounded-2xl shadow-2xl border-l-8 border-green-500 flex flex-col items-center justify-center min-h-[60vh]">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">
      Results
    </h2>
    <div className="flex flex-wrap justify-center gap-6 text-lg mb-4">
      <div className="bg-green-50 rounded-xl px-6 py-4 shadow text-center">
        <div className="font-semibold text-yellow-700">Accuracy</div>
        <div className="text-2xl font-bold">{overall.accuracy}</div>
      </div>
      <div className="bg-green-50 rounded-xl px-6 py-4 shadow text-center">
        <div className="font-semibold text-yellow-700">Precision</div>
        <div className="text-2xl font-bold">{overall.precision}</div>
      </div>
      <div className="bg-green-50 rounded-xl px-6 py-4 shadow text-center">
        <div className="font-semibold text-yellow-700">Recall</div>
        <div className="text-2xl font-bold">{overall.recall}</div>
      </div>
      <div className="bg-green-50 rounded-xl px-6 py-4 shadow text-center">
        <div className="font-semibold text-yellow-700">F1-score</div>
        <div className="text-2xl font-bold">{overall.f1}</div>
      </div>
    </div>
    <div className="mt-4 text-gray-500 text-center text-sm">
      <i>High performance achieved on all metrics across 8 classes.</i>
    </div>
  </div>
);

export default Results;