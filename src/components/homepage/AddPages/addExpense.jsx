import React, { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setResponse(""); // Clear previous response when new file is selected
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://10.121.78.248:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error uploading file:", error);
      setResponse("Error uploading file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col items-center">
      <div className="w-full max-w-lg p-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="mb-4 flex items-center text-[#234F3D] hover:text-[#1d3f31] transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Back</span>
        </button>

        <h1 className="text-2xl font-bold text-[#234F3D] mb-6 text-center">
          Upload and Predict
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Section */}
          <label className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#B4EBCA] rounded-lg bg-[#D9F2B4] hover:bg-[#B4EBCA] transition-colors cursor-pointer">
            <Upload className="h-8 w-8 text-[#234F3D] mb-2" />
            <div className="text-sm text-[#234F3D] text-center">
              {file ? file.name : "Click to upload image"}
            </div>
            <div className="text-xs text-[#234F3D] opacity-75 mt-1">
              Supports: JPG, PNG, GIF
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Upload image"
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!file || isLoading}
            className="bg-[#98d6b1] hover:bg-[#D9F2B4] text-[#234F3D] font-medium py-3 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isLoading ? "Processing..." : "Upload and Predict"}
          </button>
        </form>

        {response && (
          <div className="mt-6 bg-[#D9F2B4] p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-[#234F3D] mb-2">
              Response:
            </h2>
            <pre className="bg-white p-3 rounded-md overflow-x-auto text-sm whitespace-pre-wrap break-words">
              {response}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddExpense;