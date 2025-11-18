import { useState, useRef, useCallback } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  PhotoIcon,
  CloudArrowUpIcon,
  XMarkIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import jsPDF from "jspdf";
import "jspdf-autotable";

const API_URL = "http://127.0.0.1:8000";

const diseaseColors = {
  "Healthy": "emerald",
  "Anthracnose": "red",
  "Bacterial Canker": "orange",
  "Cutting Weevil": "yellow",
  "Die Back": "purple",
  "Gall Midge": "pink",
  "Powdery Mildew": "gray",
  "Sooty Mould": "slate",
  "Not a Mango Leaf": "gray"
};

const diseaseIcons = {
  "Healthy": "✅",
  "Anthracnose": "🔴",
  "Bacterial Canker": "🟠",
  "Cutting Weevil": "🟡",
  "Die Back": "🟣",
  "Gall Midge": "🔵",
  "Powdery Mildew": "⚪",
  "Sooty Mould": "⚫",
  "Not a Mango Leaf": "⚠️"
};

const Predictor = () => {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const resultsRef = useRef(null);

  const handleFileChange = useCallback((uploadedFiles) => {
    const validFiles = Array.from(uploadedFiles).filter(file => 
      file.type.startsWith('image/')
    ).slice(0, 10); // Limit to 10 images

    if (validFiles.length === 0) {
      setError("Please select valid image files.");
      return;
    }

    if (uploadedFiles.length > 10) {
      setError("Maximum 10 images allowed. Only first 10 will be processed.");
    }

    setFiles(validFiles);
    const urls = validFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
    setPredictions([]);
    setError(null);
  }, []);

  const handleInputChange = (e) => {
    const uploadedFiles = e.target.files;
    if (uploadedFiles && uploadedFiles.length > 0) {
      handleFileChange(uploadedFiles);
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
    
    const uploadedFiles = e.dataTransfer.files;
    if (uploadedFiles && uploadedFiles.length > 0) {
      handleFileChange(uploadedFiles);
    }
  }, [handleFileChange]);

  const handleReset = () => {
    // Clean up preview URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    
    setFiles([]);
    setPreviewUrls([]);
    setPredictions([]);
    setLoading(false);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previewUrls[index]);
    
    const newFiles = files.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    
    setFiles(newFiles);
    setPreviewUrls(newUrls);
    
    if (newFiles.length === 0) {
      handleReset();
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one image file.");
      return;
    }

    setLoading(true);
    setPredictions([]);
    setError(null);

    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(`${API_URL}/predict/batch`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setPredictions(data.predictions || []);
        if (data.failed > 0) {
          setError(`${data.failed} image(s) failed to process. Check individual results.`);
        }
        // Scroll to results after a short delay to ensure rendering
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
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

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = { top: 25, right: 20, bottom: 25, left: 20 };
    const contentWidth = pageWidth - margin.left - margin.right;
    
    // Helper function to add header and watermark to each page
    const addHeaderAndWatermark = () => {
      // Header
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text("Nitish B, 21MIS0179", margin.left, 15);
      
      // Header line
      doc.setDrawColor(200, 200, 200);
      doc.line(margin.left, 18, pageWidth - margin.right, 18);
      
      // Watermark "MLDC" in center - save current state
      doc.saveGraphicsState();
      doc.setFontSize(80);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(240, 240, 240);
      
      // Position watermark at exact center of page with slight adjustment
      const watermarkText = "MLDC";
      const centerX = pageWidth / 2 + 10; // Move 10px to the right
      const centerY = pageHeight / 2;
      
      // Rotate and place at center
      doc.text(watermarkText, centerX, centerY, {
        angle: 45,
        align: "center",
        baseline: "middle"
      });
      
      // Restore state
      doc.restoreGraphicsState();
      doc.setTextColor(0, 0, 0);
    };
    
    // Add header and watermark to first page
    addHeaderAndWatermark();
    
    let yPosition = margin.top + 5;

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Mango Leaf Disease Analysis Report", pageWidth / 2, yPosition, { align: "center" });
    
    yPosition += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, yPosition, { align: "center" });
    doc.text(`Total Images Analyzed: ${predictions.length}`, pageWidth / 2, yPosition + 5, { align: "center" });
    
    yPosition += 20;

    predictions.forEach((pred, index) => {
      // Start each disease result on a new page (except the first one)
      if (index > 0) {
        doc.addPage();
        addHeaderAndWatermark();
        yPosition = margin.top + 5;
      }

      // Image header
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`Image ${index + 1}: ${pred.filename}`, margin.left, yPosition);
      yPosition += 8;

      if (pred.success) {
        // Classification result
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`Disease: ${pred.class}`, margin.left, yPosition);
        doc.setFont("helvetica", "normal");
        doc.text(`Status: ${pred.is_mango_leaf ? "Valid Mango Leaf" : "Not a Mango Leaf"}`, margin.left, yPosition + 6);
        yPosition += 14;

        if (pred.details) {
          // Description
          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");
          doc.text("Description:", margin.left, yPosition);
          yPosition += 6;
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          const descLines = doc.splitTextToSize(pred.details.description, contentWidth);
          doc.text(descLines, margin.left, yPosition, {
            maxWidth: contentWidth,
            align: "left"
          });
          yPosition += descLines.length * 4 + 6;

          // Symptoms
          if (pred.details.symptoms && pred.details.symptoms.length > 0) {
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.text("Symptoms:", margin.left, yPosition);
            yPosition += 6;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            pred.details.symptoms.forEach(symptom => {
              const symptomLines = doc.splitTextToSize(`• ${symptom}`, contentWidth - 4);
              doc.text(symptomLines, margin.left + 4, yPosition, {
                maxWidth: contentWidth - 4,
                align: "left"
              });
              yPosition += symptomLines.length * 5;
            });
            yPosition += 4;
          }

          // Treatment
          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");
          doc.text("Treatment:", margin.left, yPosition);
          yPosition += 6;
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          const treatmentLines = doc.splitTextToSize(pred.details.treatment, contentWidth);
          doc.text(treatmentLines, margin.left, yPosition, {
            maxWidth: contentWidth,
            align: "left"
          });
          yPosition += treatmentLines.length * 4 + 6;

          // Prevention
          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");
          doc.text("Prevention:", margin.left, yPosition);
          yPosition += 6;
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          const preventionLines = doc.splitTextToSize(pred.details.prevention, contentWidth);
          doc.text(preventionLines, margin.left, yPosition, {
            maxWidth: contentWidth,
            align: "left"
          });
          yPosition += preventionLines.length * 4 + 10;
        }
      } else {
        // Error message
        doc.setFontSize(10);
        doc.setTextColor(255, 0, 0);
        doc.text(`Error: ${pred.error}`, margin.left, yPosition);
        doc.setTextColor(0, 0, 0);
        yPosition += 15;
      }
    });

    // Save the PDF
    doc.save(`mango-leaf-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Disease Diagnosis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload one or multiple mango leaf images (up to 10) and get instant AI-powered 
            disease classification with detailed treatment recommendations.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Upload Section */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Upload Leaf Images
            </h3>

            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? "border-emerald-400 bg-emerald-50"
                  : previewUrls.length > 0
                  ? "border-gray-200 bg-white"
                  : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {previewUrls.length > 0 ? (
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg shadow-md"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Remove image"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg truncate">
                          {files[index]?.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All Images
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
                      Choose Files
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        multiple
                        onChange={handleInputChange}
                        ref={fileInputRef}
                      />
                    </label>
                  </div>
                  <p className="text-gray-500 text-sm">
                    or drag and drop your images here
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    PNG, JPG, JPEG up to 10MB each (max 10 images)
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={handleUpload}
                disabled={loading || files.length === 0}
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <ArrowPathIcon className="animate-spin h-5 w-5 mr-3" />
                    Analyzing {files.length} Image{files.length > 1 ? 's' : ''}...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <PhotoIcon className="h-5 w-5 mr-3" />
                    Analyze {files.length} Image{files.length > 1 ? 's' : ''}
                  </div>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          {predictions.length > 0 && (
            <div ref={resultsRef} className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Analysis Results ({predictions.length} image{predictions.length > 1 ? 's' : ''})
              </h3>

              {predictions.map((pred, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-6">
                    {/* Image Preview */}
                    <div className="flex-shrink-0">
                      <img
                        src={previewUrls[index]}
                        alt={pred.filename}
                        className="w-32 h-32 object-cover rounded-lg shadow-md"
                      />
                      <p className="text-xs text-gray-600 mt-2 text-center truncate w-32">
                        {pred.filename}
                      </p>
                    </div>

                    {/* Results */}
                    <div className="flex-1">
                      {pred.success ? (
                        <div>
                          {/* Warning banner for non-mango leaf */}
                          {!pred.is_mango_leaf && (
                            <div className="mb-4 p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                              <div className="flex items-center">
                                <ExclamationTriangleIcon className="h-6 w-6 text-orange-500 mr-3" />
                                <div>
                                  <h5 className="font-semibold text-orange-800">Warning: Not a Mango Leaf</h5>
                                  <p className="text-sm text-orange-700">
                                    This image does not appear to be a mango leaf or the confidence is too low for accurate classification.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-12 h-12 ${pred.is_mango_leaf ? `bg-${diseaseColors[pred.class]}-100` : 'bg-orange-100'} rounded-full flex items-center justify-center`}>
                              <span className="text-2xl">{diseaseIcons[pred.class]}</span>
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-gray-900">{pred.class}</h4>
                              {/* <p className="text-sm text-gray-600">
                                Confidence: <span className="font-semibold">{pred.confidence}%</span>
                              </p> */}
                            </div>
                          </div>

                          {pred.details && pred.is_mango_leaf && (
                            <div className="space-y-4">
                              {/* Description */}
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2">Description</h5>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                  {pred.details.description}
                                </p>
                              </div>

                              {/* Symptoms */}
                              {pred.details.symptoms && pred.details.symptoms.length > 0 && (
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-2">Symptoms</h5>
                                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                    {pred.details.symptoms.slice(0, 4).map((symptom, i) => (
                                      <li key={i}>{symptom}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Treatment Summary */}
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2">Treatment Recommendation</h5>
                                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                                  {pred.details.treatment}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Show guidance for non-mango leaf */}
                          {pred.details && !pred.is_mango_leaf && (
                            <div className="space-y-4">
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2">Recommendation</h5>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                  {pred.details.description}
                                </p>
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2">How to Get Better Results</h5>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                  {pred.details.treatment}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">Processing Failed</h4>
                            <p className="text-red-600 text-sm">{pred.error}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Export Button at Bottom */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={exportToPDF}
                  className="py-4 px-8 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-center">
                    <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                    Export PDF Report
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {predictions.length === 0 && !loading && files.length === 0 && (
            <div className="bg-gray-50 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhotoIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Ready for Analysis
              </h4>
              <p className="text-gray-600 text-sm">
                Upload mango leaf images to get started with disease diagnosis
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predictor;


