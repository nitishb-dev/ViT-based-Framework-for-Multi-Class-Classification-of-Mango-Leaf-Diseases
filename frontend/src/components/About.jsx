import React from "react";

const About = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-8 border-green-500 flex flex-col items-center justify-center min-h-[70vh] animate-fade-in-up">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 text-center transition-colors duration-300">
        About the Project
      </h2>
      <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center max-w-4xl">
        This project is a full-stack application for real-time mango leaf
        disease classification.
        <br />
        The backend is built with <b className="text-green-600">FastAPI</b> for
        high performance, utilizing a{" "}
        <b className="text-green-600">Swin Transformer (ViT)</b> model
        fine-tuned using the <b className="text-green-600">LoRA</b> (Low-Rank
        Adaptation) technique for efficient and accurate prediction. The
        frontend is a single-page application (SPA) created with{" "}
        <b className="text-green-600">React, Vite, and Tailwind CSS</b> for a
        modern, responsive user experience.
      </p>
    </div>
  );
};

export default About;
