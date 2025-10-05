import React, { useState, useRef, useCallback } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  PhotoIcon,
  CloudArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const API_URL = "http://127.0.0.1:8000";

const diseaseInfo = {
  "Healthy": {
    color: "emerald",
    icon: "✅",
    description: "No disease detected. The leaf appears healthy.",
    recommendation: "Continue regular care and monitoring."
  },
  "Anthracnose": {
    color: "red",
    icon: "🔴",
    description: "Fungal disease causing dark lesions on leaves and fruits.",
    recommendation: "Apply fungicide and improve air circulation."
  },
  "Bacterial Canker": {
    color: "orange",
    icon: "🟠",
    description: "Bacterial infection causing cankers and leaf spots.",
    recommendation: "Remove affected parts and apply copper-based treatment."
  },
  "Cutting Weevil": {
    color: "yellow",
    icon: "🟡",
    description: "Pest damage from weevil larvae cutting through leaves.",
    recommendation: "Use integrated pest management strategies."
  },
  "Die Back": {
    color: "purple",
    icon: "🟣",
    description: "Progressive dying of shoots and branches.",
    recommendation: "Prune affected areas and improve plant nutrition."
  },
  "Gall Midge": {
    color: "pink",
    icon: "🔵",
    description: "Insect pest causing galls on leaves and shoots.",
    recommendation: "Apply appropriate insecticide during active periods."
  },
  "Powdery Mildew": {
    color: "gray",
    icon: "⚪",
    description: "Fungal disease creating white powdery coating.",
    recommendation: "Improve air circulation and apply fungicide."
  },
  "Sooty Mould": {
    color: "slate",
    icon: "⚫",
    description: "Black fungal growth on leaf surfaces.",
    recommendation: "Control honeydew-producing insects first."
  }
};

const Predictor = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = useCallback((uploadedFile) => {
    if (uploadedFile && uploadedFile.type.startsWith('image/')) {
      setFile(uploadedFile);
      setPreviewUrl(URL.createObjectURL(uploadedFile));
      setPrediction(null);
      setError(null);
    } else {
      setError("Please select a valid image file.");
    }
  }, []);

  const handleInputChange = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      handleFileChange(uploadedFile);
    }
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const uploadedFile = e.dataTransfer.files?.[0];
    if (uploadedFile) {
      handleFileChange(uploadedFile);
    }
  }, [handleFileChange]);

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
        setError(data.error || "An unknown error occurred during prediction.");
      }
    } catch (e) {
      setError(
        "Could not connect to the backend API. Please ensure the server is running."
      );
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  const predictionData = prediction ? diseaseInfo[prediction] : null;

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Disease Diagnosis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload a mango leaf image and get instant AI-powered disease classification 
            with treatment recommendations.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Upload Leaf Image
              </h3>

              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? "border-emerald-400 bg-emerald-50"
                    : previewUrl
                    ? "border-gray-200 bg-white"
                    : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Leaf Preview"
                      className="mx-auto max-h-64 w-auto object-contain rounded-lg shadow-md"
                    />
                    <button
                      onClick={handleReset}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      aria-label="Remove image"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <CloudArrowUpIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <div className="mb-4">
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                      >
                        Choose File
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleInputChange}
                          ref={fileInputRef}
                        />
                      </label>
                    </div>
                    <p className="text-gray-500 text-sm">
                      or drag and drop your image here
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                      PNG, JPG, JPEG up to 10MB
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleUpload}
                disabled={loading || !file}
                className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <ArrowPathIcon className="animate-spin h-5 w-5 mr-3" />
                    Analyzing Image...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <PhotoIcon className="h-5 w-5 mr-3" />
                    Get Diagnosis
                  </div>
                )}
              </button>
            </div>

            {/* Results Section */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Diagnosis Results
              </h3>

              <div className="min-h-[300px] flex items-center justify-center">
                {error && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Analysis Failed
                    </h4>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {loading && !error && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ArrowPathIcon className="animate-spin h-8 w-8 text-emerald-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Processing Image
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Our AI is analyzing the leaf features...
                    </p>
                  </div>
                )}

                {prediction && !loading && predictionData && (
                  <div className="w-full">
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 bg-${predictionData.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <CheckCircleIcon className={`h-8 w-8 text-${predictionData.color}-600`} />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">
                        {prediction}
                      </h4>
                      <div className="text-4xl mb-4">{predictionData.icon}</div>
                    </div>

                    <div className={`bg-${predictionData.color}-50 border border-${predictionData.color}-200 rounded-xl p-6`}>
                      <h5 className="font-semibold text-gray-900 mb-2">Description</h5>
                      <p className="text-gray-700 text-sm mb-4">
                        {predictionData.description}
                      </p>
                      
                      <h5 className="font-semibold text-gray-900 mb-2">Recommendation</h5>
                      <p className={`text-${predictionData.color}-700 text-sm font-medium`}>
                        {predictionData.recommendation}
                      </p>
                    </div>
                  </div>
                )}

                {!prediction && !loading && !error && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PhotoIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Ready for Analysis
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Upload a mango leaf image to get started
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictor;

// import React, { useState, useRef, useCallback } from "react";
// import {
//   CheckCircleIcon,
//   ExclamationTriangleIcon,
//   ArrowPathIcon,
//   PhotoIcon,
//   CloudArrowUpIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";

// const API_URL = "http://127.0.0.1:8000";

// const diseaseInfo = {
//   Healthy: {
//     color: "emerald",
//     icon: "✅",
//     description: "No disease detected. The leaf appears healthy.",
//     recommendation: "Continue regular care and monitoring.",
//   },
//   Anthracnose: {
//     color: "red",
//     icon: "🔴",
//     description: "Fungal disease causing dark lesions on leaves and fruits.",
//     recommendation: "Apply fungicide and improve air circulation.",
//   },
//   "Bacterial Canker": {
//     color: "orange",
//     icon: "🟠",
//     description: "Bacterial infection causing cankers and leaf spots.",
//     recommendation: "Remove affected parts and apply copper-based treatment.",
//   },
//   "Cutting Weevil": {
//     color: "yellow",
//     icon: "🟡",
//     description: "Pest damage from weevil larvae cutting through leaves.",
//     recommendation: "Use integrated pest management strategies.",
//   },
//   "Die Back": {
//     color: "purple",
//     icon: "🟣",
//     description: "Progressive dying of shoots and branches.",
//     recommendation: "Prune affected areas and improve plant nutrition.",
//   },
//   "Gall Midge": {
//     color: "pink",
//     icon: "🔵",
//     description: "Insect pest causing galls on leaves and shoots.",
//     recommendation: "Apply appropriate insecticide during active periods.",
//   },
//   "Powdery Mildew": {
//     color: "gray",
//     icon: "⚪",
//     description: "Fungal disease creating white powdery coating.",
//     recommendation: "Improve air circulation and apply fungicide.",
//   },
//   "Sooty Mould": {
//     color: "slate",
//     icon: "⚫",
//     description: "Black fungal growth on leaf surfaces.",
//     recommendation: "Control honeydew-producing insects first.",
//   },
// };

// const Predictor = () => {
//   const [files, setFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [predictions, setPredictions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [dragActive, setDragActive] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleFileChange = useCallback((uploadedFiles) => {
//     const validFiles = Array.from(uploadedFiles).filter((f) =>
//       f.type.startsWith("image/")
//     );
//     if (validFiles.length > 0) {
//       setFiles(validFiles);
//       setPreviews(validFiles.map((f) => URL.createObjectURL(f)));
//       setPredictions([]);
//       setError(null);
//     } else {
//       setError("Please select valid image files.");
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     if (e.target.files?.length) {
//       handleFileChange(e.target.files);
//     }
//   };

//   const handleDrag = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
//     else if (e.type === "dragleave") setDragActive(false);
//   }, []);

//   const handleDrop = useCallback(
//     (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       setDragActive(false);
//       if (e.dataTransfer.files?.length) handleFileChange(e.dataTransfer.files);
//     },
//     [handleFileChange]
//   );

//   const handleReset = () => {
//     setFiles([]);
//     setPreviews([]);
//     setPredictions([]);
//     setLoading(false);
//     setError(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleUpload = async () => {
//     if (!files.length) {
//       setError("Please select at least one image file.");
//       return;
//     }

//     setLoading(true);
//     setPredictions([]);
//     setError(null);

//     const formData = new FormData();
//     files.forEach((f) => formData.append("files", f));

//     try {
//       const response = await fetch(`${API_URL}/predict`, {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setPredictions(data.predictions);
//       } else {
//         setError(data.error || "An unknown error occurred during prediction.");
//       }
//     } catch (e) {
//       setError(
//         "Could not connect to the backend API. Please ensure the server is running."
//       );
//       console.error("Fetch error:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
//             Disease Diagnosis
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Upload one or more mango leaf images and get instant AI-powered disease
//             classification with treatment recommendations.
//           </p>
//         </div>

//         <div className="max-w-6xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-8">
//             {/* Upload Section */}
//             <div className="bg-gray-50 rounded-2xl p-8">
//               <h3 className="text-xl font-semibold text-gray-900 mb-6">
//                 Upload Leaf Image(s)
//               </h3>

//               <div
//                 className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
//                   dragActive
//                     ? "border-emerald-400 bg-emerald-50"
//                     : previews.length
//                     ? "border-gray-200 bg-white"
//                     : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50"
//                 }`}
//                 onDragEnter={handleDrag}
//                 onDragLeave={handleDrag}
//                 onDragOver={handleDrag}
//                 onDrop={handleDrop}
//               >
//                 {previews.length > 0 ? (
//                   <div className="flex flex-wrap gap-4 justify-center">
//                     {previews.map((p, idx) => (
//                       <div key={idx} className="relative">
//                         <img
//                           src={p}
//                           alt={`Preview ${idx}`}
//                           className="h-32 w-32 object-contain rounded-lg shadow-md"
//                         />
//                       </div>
//                     ))}
//                     <button
//                       onClick={handleReset}
//                       className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
//                       aria-label="Remove all images"
//                     >
//                       <XMarkIcon className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <div>
//                     <CloudArrowUpIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
//                     <div className="mb-4">
//                       <label
//                         htmlFor="file-upload"
//                         className="cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
//                       >
//                         Choose Files
//                         <input
//                           id="file-upload"
//                           name="file-upload"
//                           type="file"
//                           className="sr-only"
//                           accept="image/*"
//                           multiple
//                           onChange={handleInputChange}
//                           ref={fileInputRef}
//                         />
//                       </label>
//                     </div>
//                     <p className="text-gray-500 text-sm">
//                       or drag and drop your images here
//                     </p>
//                     <p className="text-gray-400 text-xs mt-2">
//                       PNG, JPG, JPEG up to 10MB each
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <button
//                 onClick={handleUpload}
//                 disabled={loading || !files.length}
//                 className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center">
//                     <ArrowPathIcon className="animate-spin h-5 w-5 mr-3" />
//                     Analyzing Images...
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center">
//                     <PhotoIcon className="h-5 w-5 mr-3" />
//                     Get Diagnosis
//                   </div>
//                 )}
//               </button>
//             </div>

//             {/* Results Section */}
//             <div className="bg-gray-50 rounded-2xl p-8">
//               <h3 className="text-xl font-semibold text-gray-900 mb-6">
//                 Diagnosis Results
//               </h3>

//               <div className="min-h-[300px] flex flex-col gap-6 items-center justify-start">
//                 {error && (
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
//                     </div>
//                     <h4 className="text-lg font-semibold text-gray-900 mb-2">
//                       Analysis Failed
//                     </h4>
//                     <p className="text-red-600 text-sm">{error}</p>
//                   </div>
//                 )}

//                 {loading && !error && (
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <ArrowPathIcon className="animate-spin h-8 w-8 text-emerald-600" />
//                     </div>
//                     <h4 className="text-lg font-semibold text-gray-900 mb-2">
//                       Processing Images
//                     </h4>
//                     <p className="text-gray-600 text-sm">
//                       Our AI is analyzing the leaf features...
//                     </p>
//                   </div>
//                 )}

//                 {!loading &&
//                   !error &&
//                   predictions.length === 0 && (
//                     <div className="text-center">
//                       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <PhotoIcon className="h-8 w-8 text-gray-400" />
//                       </div>
//                       <h4 className="text-lg font-semibold text-gray-900 mb-2">
//                         Ready for Analysis
//                       </h4>
//                       <p className="text-gray-600 text-sm">
//                         Upload mango leaf image(s) to get started
//                       </p>
//                     </div>
//                   )}

//                 {!loading &&
//                   !error &&
//                   predictions.map((pred, idx) => {
//                     const info = diseaseInfo[pred.class];
//                     return (
//                       <div
//                         key={idx}
//                         className={`w-full bg-${info.color}-50 border border-${info.color}-200 rounded-xl p-6`}
//                       >
//                         <div className="flex items-center justify-between mb-2">
//                           <h4 className="text-lg font-semibold text-gray-900">
//                             {pred.filename}
//                           </h4>
//                           <span className={`text-${info.color}-700 font-medium`}>
//                             {pred.confidence.toFixed(2)}%
//                           </span>
//                         </div>
//                         <div className="flex items-center mb-3 text-xl">
//                           <span className="mr-2">{info.icon}</span>
//                           <span className="font-semibold text-gray-800">
//                             {pred.class}
//                           </span>
//                         </div>
//                         <p className="text-gray-700 text-sm mb-2">{info.description}</p>
//                         <p className={`text-${info.color}-700 text-sm font-medium`}>
//                           {info.recommendation}
//                         </p>
//                       </div>
//                     );
//                   })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Predictor;
