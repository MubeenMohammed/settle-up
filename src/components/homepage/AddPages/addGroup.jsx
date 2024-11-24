import React, { useState } from "react";
import { Camera } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { addGroups, getGroupsByUserId } from "../../../backendFunctions/backendFunctions";
import { getUser } from "../../../superbase/auth";

export default function AddGroup({ screenSize }) {
  const Navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const animatedText = "Get ready to split it up and keep it fair!";

  const location = useLocation();
  const { setOnFriendsTab } = location.state || {};

  const dynamicStyles = {
    container: {
      width: screenSize?.width,
      height: "100vh",
    },
    input: {
      fontSize: screenSize?.width < 480 ? "14px" : "16px",
    },
    typingContainer: {
      fontFamily: "'Rockwell Nova Cond', serif",
      fontSize: screenSize?.width < 480 ? "18px" : "24px",
      fontWeight: "bold",
      color: "#234F3D",
      textAlign: "center",
      overflow: "hidden",
      whiteSpace: "nowrap",
      display: "inline-block",
    },
  };

  const handleDone = async () => {
    if (!groupName.trim() || description.trim() === "") {
      alert("Please enter a group name and description");
      return;
    }
  
    try {
      const user = await getUser();
      await addGroups(groupName, user.user.user.id, description);
      await getGroupsByUserId(user.user.user.id).then((data) => {
        sessionStorage.setItem("userGroups", JSON.stringify(data.data));
      });
      Navigate("/home"); // Navigate only after the group is successfully added
    } catch (error) {
      console.error("Error while creating the group:", error);
    }
  };

  return (
    <div
      style={dynamicStyles.container}
      className="mx-auto flex flex-col bg-[#ffffff] p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          className="text-[#234F3D] hover:text-opacity-80 transition-colors p-2"
          aria-label="Close"
          onClick={() => {
            Navigate("/home");
          }}
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

      {/* Description Input */}
      <div className="mb-12">
        <label
          htmlFor="description"
          className="block text-sm text-[#234F3D] font-medium mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a short description about the group"
          style={dynamicStyles.input}
          className="w-full border-b-2 border-[#B4EBCA] focus:outline-none focus:border-[#234F3D] text-lg text-[#234F3D] py-1 bg-transparent placeholder-gray-400 resize-none"
          maxLength={100}
          rows={1}
        />
      </div>

      {/* Animated Text Section */}
      <div className="mt-6 text-center">
        <div
          style={{
            ...dynamicStyles.typingContainer,
            animation:
              "typing 3.5s steps(40, end), blink 0.75s step-end 3.5s forwards",
          }}
        >
          {animatedText}
        </div>
      </div>

      {/* Inline CSS for animations */}
      <style>
        {`
          @font-face {
            font-family: 'Rockwell Nova Cond';
            src: url('https://fonts.cdnfonts.com/s/26168/RockwellNovaCond-Regular.woff') format('woff');
          }

          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }

          @keyframes blink {
            0% { border-color: transparent }
            50% { border-color: #234F3D }
            100% { border-color: transparent }
          }

          .animate-typing {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
          }
        `}
      </style>
    </div>
  );
}
