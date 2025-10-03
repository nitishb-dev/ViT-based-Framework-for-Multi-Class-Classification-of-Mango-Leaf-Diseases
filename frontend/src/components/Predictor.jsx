import React, { useState, useRef } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
// IMPORTANT: Update this URL if your FastAPI backend is running elsewhere
const API_URL = "http://127.0.0.1:8000";

const Predictor = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files && e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreviewUrl(URL.createObjectURL(uploadedFile));
      setPrediction(null); // Reset prediction on new file
      setError(null);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setPrediction(null);
    setLoading(false);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image file first.");
      return;
    }

    setLoading(true);
    setPrediction(null);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(data.class);
      } else {
        // Handle FastAPI-level errors (e.g., file not an image, processing failed)
        setError(data.error || "An unknown error occurred during prediction.");
      }
    } catch (e) {
      // Handle network or CORS errors
      setError(
        "Could not connect to the backend API. Please ensure the server is running."
      );
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 w-full max-w-7xl mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-xl animate-fade-in-up">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center">
        Diagnose Your Mango Leaf
      </h2>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left: Image Upload and Preview */}
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">1. Upload Image</h3>

          <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors duration-300 px-6 py-10 bg-gray-50/50">
            <div className="text-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Leaf Preview"
                  className="mx-auto h-48 w-auto object-contain rounded-md transition-all duration-300"
                />
              ) : (
                <>
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-400"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className="w-full flex-grow py-3 px-4 rounded-lg text-lg font-bold text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:cursor-not-allowed disabled:bg-green-300 bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg disabled:shadow-none transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <ArrowPathIcon className="animate-spin h-5 w-5 mr-3" />
                  Processing...
                </div>
              ) : (
                "2. Get Prediction"
              )}
            </button>
            <button
              onClick={handleReset}
              className="py-3 px-4 rounded-lg font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
              aria-label="Reset"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Right: Prediction Result */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-center min-h-[380px]">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">3. Result</h3>

          {error && (
            <div className="p-4 bg-red-100 text-red-800 rounded-lg text-center font-medium flex items-center justify-center animate-fade-in-up">
              <ExclamationTriangleIcon className="h-6 w-6 mr-2 text-red-600" />
              <div>
                <strong>Error:</strong> {error}
              </div>
            </div>
          )}

          {loading && !error && (
            <div className="text-center py-10 animate-fade-in-up">
              <ArrowPathIcon className="animate-spin h-10 w-10 text-green-600 mx-auto mb-4" />
              <p className="text-green-600 font-medium">
                Analyzing leaf features...
              </p>
            </div>
          )}

          {prediction && !loading && (
            <div className="text-center p-6 border-4 border-green-400 rounded-lg bg-green-50 animate-fade-in-up">
              <div className="flex items-center justify-center text-2xl font-bold text-gray-800 mb-2">
                <CheckCircleIcon className="h-8 w-8 text-green-600 mr-2" />
                Diagnosis Complete
              </div>
              <p className="text-5xl font-extrabold text-green-700 my-4">
                {prediction}
              </p>
              <p className="text-lg text-gray-600 mt-2">
                This is the most likely classification for the provided image.
              </p>
            </div>
          )}

          {!prediction && !loading && !error && (
            <div className="text-center text-gray-400 py-10 animate-fade-in-up">
              <p>Your diagnosis will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predictor;
