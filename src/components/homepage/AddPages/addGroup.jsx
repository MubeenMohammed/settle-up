import { useState } from "react";
import { Camera, AirplayIcon, Home, Heart, ClipboardList } from "lucide-react";
import FileUpload from "../../fileUpload";

export default function AddGroup({ screenSize }) {
  const [groupName, setGroupName] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const groupTypes = [
    { name: "Trip", icon: <AirplayIcon className="w-6 h-6" />, color: "#B4EBCA" },
    { name: "Home", icon: <Home className="w-6 h-6" />, color: "#D9F2B4" },
    { name: "Couple", icon: <Heart className="w-6 h-6" />, color: "#BCF4F5" },
    { name: "Other", icon: <ClipboardList className="w-6 h-6" />, color: "#B4EBCA" },
  ];

  const dynamicStyles = {
    container: {
      width: screenSize.width < 480 ? "360px" : "412px",
      height: "100vh",
    },
    input: {
      fontSize: screenSize.width < 480 ? "14px" : "16px",
    },
    button: {
      fontSize: screenSize.width < 480 ? "12px" : "14px",
    },
  };

  return (
    <div
      style={dynamicStyles.container}
      className="mx-auto flex flex-col bg-white p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button className="text-[#234F3D]">
          <span className="text-2xl">&times;</span>
        </button>
        <h1 className="text-xl font-semibold text-[#234F3D]">Create a group</h1>
        <button className="text-[#234F3D] font-medium">Done</button>
      </div>

      {/* Group Name Input */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-[#D9F2B4] rounded-lg flex items-center justify-center mr-4">
          <Camera className="w-6 h-6 text-[#234F3D]" />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-[#234F3D] font-medium mb-2">
            Group name
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            style={dynamicStyles.input}
            className="w-full border-b-2 border-[#B4EBCA] focus:outline-none focus:border-[#234F3D] text-lg text-[#234F3D] py-1"
          />
        </div>
      </div>

      {/* Group Type Selector */}
      <div>
        <h2 className="text-sm text-[#234F3D] font-medium mb-4">Type</h2>
        <div className="flex gap-4 flex-wrap">
          {groupTypes.map((type) => (
            <button
              key={type.name}
              onClick={() => setSelectedType(type.name)}
              style={dynamicStyles.button}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                selectedType === type.name
                  ? "border-[#234F3D] bg-[#D9F2B4]"
                  : "border-gray-300 bg-white"
              }`}
            >
              <span
                className="flex items-center justify-center"
                style={{ color: selectedType === type.name ? "#234F3D" : "#666" }}
              >
                {type.icon}
              </span>
              <span
                className={`font-medium text-sm ${
                  selectedType === type.name ? "text-[#234F3D]" : "text-gray-600"
                }`}
              >
                {type.name}
              </span>
            </button>
          ))}
          <FileUpload/>
        </div>
      </div>
    </div>
  );
}
