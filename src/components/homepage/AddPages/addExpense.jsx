import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

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
      setResponse(JSON.stringify(data, null, 2)); // Display formatted JSON
    } catch (error) {
      console.error("Error uploading file:", error);
      setResponse("Error uploading file");
    }
  };

  return (
    <div>
      <h1>Upload and Predict</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUpload;