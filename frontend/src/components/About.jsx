import React from 'react';

const About = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 bg-white rounded-2xl shadow-2xl border-l-8 border-green-500 flex flex-col items-center justify-center min-h-[70vh]">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 text-center">
        About the Project
      </h2>
      <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center">
        This project is a full-stack application for real-time mango leaf disease classification.
        <br />
        The backend is built with <b>FastAPI</b> for high performance, utilizing a
        <b> Swin Transformer (ViT)</b> model fine-tuned using the <b>LoRA</b> (Low-Rank Adaptation)
        technique for efficient and accurate prediction. The frontend is a single-page
        application (SPA) created with <b>React, Vite, and Tailwind CSS</b> for a modern,
        responsive user experience.
      </p>
    </div>
  );
};

export default About;