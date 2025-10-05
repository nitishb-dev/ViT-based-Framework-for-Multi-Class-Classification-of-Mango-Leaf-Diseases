import React from "react";
import { 
  CpuChipIcon, 
  CloudIcon, 
  DevicePhoneMobileIcon,
  BeakerIcon 
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: CpuChipIcon,
    title: "ViT Model",
    description: "Swin Transformer with LoRA adaptation for superior accuracy and efficiency in disease detection."
  },
  {
    icon: CloudIcon,
    title: "FastAPI Backend",
    description: "High-performance REST API built with FastAPI for lightning-fast image processing and predictions."
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Responsive Design",
    description: "Modern React SPA with Tailwind CSS, optimized for all devices from mobile to desktop."
  },
  {
    icon: BeakerIcon,
    title: "Research-Grade",
    description: "Built on cutting-edge research with rigorous validation and testing methodologies."
  }
];

const About = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About the Project
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive AI-powered solution for real-time mango leaf disease classification, 
            combining state-of-the-art deep learning with modern web technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why Mango Disease Detection Matters
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Mango (Mangifera indica L.) is one of the world's most important fruit crops, 
              but diseases can devastate entire harvests. Early detection is crucial for:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Preventing disease spread to healthy plants
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Reducing crop losses and economic impact
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Enabling targeted treatment strategies
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Supporting sustainable agriculture practices
              </li>
            </ul>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🥭</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">8 Disease Classes</h4>
              <p className="text-gray-600 text-sm">
                Anthracnose, Bacterial Canker, Cutting Weevil, Die Back, 
                Gall Midge, Healthy, Powdery Mildew, Sooty Mould
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
