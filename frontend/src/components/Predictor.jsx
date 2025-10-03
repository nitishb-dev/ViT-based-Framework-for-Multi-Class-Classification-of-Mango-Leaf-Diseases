import React, { useState } from 'react';

// IMPORTANT: Update this URL if your FastAPI backend is running elsewhere
const API_URL = 'http://127.0.0.1:8000'; 

const Predictor = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreviewUrl(URL.createObjectURL(uploadedFile));
      setPrediction(null); // Reset prediction on new file
      setError(null);
    }
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
    formData.append('file', file);
    await fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      body: formData,
    });

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
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
      setError("Could not connect to the backend API. Please ensure the server is running.");
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 w-full max-w-7xl mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-2xl">
      <h2 className="text-4xl font-extrabold text-black-700 mb-6 text-center">
        Diagnose Your Mango Leaf
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Image Upload and Preview */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">1. Upload Image</h3>
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-green-50 file:text-green-700
                hover:file:bg-green-100"
            />
          </div>

          <div className="h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
            {previewUrl ? (
              <img src={previewUrl} alt="Leaf Preview" className="h-full w-full object-contain" />
            ) : (
              <p className="text-gray-400">Image preview will appear here</p>
            )}
          </div>
          
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className={`mt-6 w-full py-3 rounded-lg text-lg font-bold transition duration-300 
              ${loading || !file
                ? 'bg-green-300 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
              }`}
          >
            {loading ? 'Processing...' : '2. Get Prediction'}
          </button>
        </div>

        {/* Right: Prediction Result */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">3. Prediction Result</h3>
          
          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center font-medium">
              🚨 Error: {error}
            </div>
          )}

          {loading && !error && (
            <div className="text-center py-10">
              <svg className="animate-spin h-8 w-8 text-green-600 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-green-600 font-medium">Analyzing leaf features...</p>
            </div>
          )}

          {prediction && !loading && (
            <div className="text-center p-6 border-4 border-green-400 rounded-lg bg-green-50">
              <p className="text-2xl font-bold text-gray-800 mb-2">Diagnosis Complete!</p>
              <p className="text-4xl font-extrabold text-green-700">
                {prediction}
              </p>
              <p className="text-lg text-gray-600 mt-2">
                This is the most likely classification based on the image.
              </p>
            </div>
          )}

          {!file && !loading && !error && (
            <p className="text-center text-gray-400 py-10">
              Upload an image of a mango leaf to begin the classification.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predictor;