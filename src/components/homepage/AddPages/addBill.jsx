import React, { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { uploadBill } from "../../../backendFunctions/backendFunctions";

const AddBill = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(""); // State for the selected group
  const [paidBy, setPaidBy] = useState(""); // State for the Paid By field
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedGroup) {
      alert("Please select a group!");
      return;
    }

    if (!paidBy) {
      alert("Please select who paid the bill!");
      return;
    }

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadBill(formData, selectedGroup, paidBy); // Call the API function
      if(result.status === "success") {
        
        navigate("/bill-item-cards");
      }
    } catch (error) {
      console.error("Error during upload:", error);
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
          {/* Select Group Section */}
          <div>
            <label
              htmlFor="group"
              className="block text-sm font-medium text-[#234F3D] mb-2"
            >
              Select the group
            </label>
            <select
              id="group"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              required
              className="w-full border-2 border-[#B4EBCA] bg-[#D9F2B4] text-[#234F3D] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#234F3D] focus:border-transparent"
            >
              <option value="" disabled>
                -- Select a group --
              </option>
              {JSON.parse(sessionStorage.getItem("userGroups")).map((group) => (
                <option key={group.group_id} value={group.group_id}>
                  {group.group_name}
                </option>
              ))}
            </select>
          </div>

          {/* Select Paid By Section */}
          <div>
            <label
              htmlFor="paidBy"
              className="block text-sm font-medium text-[#234F3D] mb-2"
            >
              Paid By
            </label>
            <select
              id="paidBy"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              required
              className="w-full border-2 border-[#B4EBCA] bg-[#D9F2B4] text-[#234F3D] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#234F3D] focus:border-transparent"
            >
              <option value="" disabled>
                -- Select who paid --
              </option>
              {JSON.parse(sessionStorage.getItem("userFriends")).map(
                (friend) => (
                  <option key={friend.friend_id} value={friend.friend_id}>
                    {friend.friend_name}
                  </option>
                )
              )}
              {/* Add the user as the last option */}
              {(() => {
                const user = JSON.parse(sessionStorage.getItem("user"));
                return (
                  <option key={user.id} value={user.id}>
                    You
                  </option>
                );
              })()}
            </select>
          </div>

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
            disabled={!file || !selectedGroup || !paidBy || isLoading}
            className="bg-[#98d6b1] hover:bg-[#D9F2B4] text-[#234F3D] font-medium py-3 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isLoading ? "Processing..." : "Upload and Predict"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBill;
