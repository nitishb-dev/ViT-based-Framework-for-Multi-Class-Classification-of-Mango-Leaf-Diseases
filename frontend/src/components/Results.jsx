import React from "react";
import { 
  ChartBarIcon, 
  TrophyIcon, 
  AcademicCapIcon,
  CheckBadgeIcon 
} from "@heroicons/react/24/outline";

const metrics = [
  {
    name: "Accuracy",
    value: 99.33,
    icon: TrophyIcon,
    description: "Overall classification accuracy across all disease classes"
  },
  {
    name: "Precision",
    value: 99.34,
    icon: CheckBadgeIcon,
    description: "Precision in identifying positive cases correctly"
  },
  {
    name: "Recall",
    value: 99.34,
    icon: ChartBarIcon,
    description: "Ability to find all relevant instances in the dataset"
  },
  {
    name: "F1-Score",
    value: 99.34,
    icon: AcademicCapIcon,
    description: "Harmonic mean of precision and recall"
  }
];

const classPerformance = [
  { name: "Healthy", accuracy: 100.0},
  { name: "Anthracnose", accuracy: 98.7},
  { name: "Bacterial Canker", accuracy: 99.1},
  { name: "Cutting Weevil", accuracy: 99.3},
  { name: "Die Back", accuracy: 98.9},
  { name: "Gall Midge", accuracy: 99.6},
  { name: "Powdery Mildew", accuracy: 99.2},
  { name: "Sooty Mould", accuracy: 98.8}
];

const Results = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Performance Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our model achieves state-of-the-art performance with exceptional accuracy 
            across all disease classification tasks.
          </p>
        </div>

        {/* Overall Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <metric.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    {metric.value}%
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {metric.name}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
