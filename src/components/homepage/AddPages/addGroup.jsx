import React, { useState } from "react";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddGroup({ screenSize }) {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const animatedText = "Get ready to split it up and keep it fair!";

  const dynamicStyles = {
    container: {
      width: screenSize?.width,
      height: "100vh",
    },
    input: {
      fontSize: screenSize?.width < 480 ? "14px" : "16px",
    },
    typingContainer: {
      fontSize: screenSize?.width < 480 ? "14px" : "16px",
      color: "#234F3D",
      textAlign: "center",
      whiteSpace: "nowrap",
      overflow: "hidden",
      borderRight: "2px solid #234F3D",
      display: "inline-block",
    },
  };

  const handleDone = () => {
    if (!groupName.trim()) {
      alert("Please enter a group name");
      return;
    }
    console.log("Creating group:", groupName);
  };

  return (
    <div
      style={dynamicStyles.container}
      className="mx-auto flex flex-col bg-[#BCF4F5] p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          className="text-[#234F3D] hover:text-opacity-80 transition-colors p-2"
          aria-label="Close"
          onClick={() => navigate("/home")}
        >
          <span className="text-2xl leading-none">&times;</span>
        </button>
        <h1 className="text-xl font-semibold text-[#234F3D]">Create a group</h1>
        <button
          className="text-[#234F3D] font-medium hover:text-opacity-80 transition-colors disabled:opacity-50 px-2 py-1"
          onClick={handleDone}
          disabled={!groupName.trim()}
        >
          Done
        </button>
      </div>

      {/* Group Name Input */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-[#D9F2B4] rounded-lg flex items-center justify-center mr-4 cursor-pointer hover:bg-[#B4EBCA] transition-colors">
          <Camera className="w-6 h-6 text-[#234F3D]" />
        </div>
        <div className="flex-1">
          <label
            htmlFor="groupName"
            className="block text-sm text-[#234F3D] font-medium mb-2"
          >
            Group name
          </label>
          <input
            id="groupName"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            style={dynamicStyles.input}
            className="w-full border-b-2 border-[#B4EBCA] focus:outline-none focus:border-[#234F3D] text-lg text-[#234F3D] py-1 bg-transparent placeholder-gray-400"
            maxLength={50}
            autoFocus
          />
        </div>
      </div>

      {/* Animated Text Section */}
      <div className="mt-8 text-center">
        <div
          style={{
            ...dynamicStyles.typingContainer,
            animation: "typing 3.5s steps(40, end), blink 0.75s step-end infinite",
            width: "100%",
          }}
        >
          {animatedText}
        </div>
      </div>

      {/* Inline CSS for animations */}
      <style>
        {`
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }

          @keyframes blink {
            0% { border-color: transparent }
            50% { border-color: #234F3D }
            100% { border-color: transparent }
          }
        `}
      </style>
    </div>
  );
}