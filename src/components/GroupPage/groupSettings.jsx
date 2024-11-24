import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const GroupSettings = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Correctly initialize `navigate` function
  const { group } = location.state || {};
  const [groupName, setGroupName] = useState(
    group ? group.group_name : "Group Name"
  );
  const [groupMembers, setGroupMembers] = useState(
    sessionStorage.getItem("groupDetails")
      ? JSON.parse(sessionStorage.getItem("groupDetails")).members
      : []
  );

  const handleEditGroupName = () => {
    const newName = prompt("Enter new group name:", groupName);
    if (newName) setGroupName(newName);
  };

  const handleAddMember = () => {
    const newMember = prompt("Enter new member's name:");
    if (newMember) setGroupMembers([...groupMembers, newMember]);
  };

  const handleLeaveGroup = () => {
    alert("You have left the group.");
    // Add actual functionality for leaving the group
  };

  const handleDeleteGroup = () => {
    if (
      window.confirm(
        "Are you sure you want to delete the group? This action cannot be undone."
      )
    ) {
      alert("Group deleted.");
      // Add actual functionality for deleting the group
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#BCF4F5] to-[#D9F2B4] min-h-screen p-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#234F3D] text-white p-4 rounded-md shadow-lg">
        <button
          className="text-lg font-semibold flex items-center space-x-1"
          onClick={() => {
            sessionStorage.removeItem("groupDetails");
            navigate("/home"); // Use the `navigate` function
          }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-xl font-bold">Group Settings</h1>
      </div>

      {/* Body */}
      <div className="mt-6 space-y-6">
        {/* Group Name */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#234F3D]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#234F3D]">Group Name</h2>
            <button
              className="bg-[#BCF4F5] text-[#234F3D] py-1 px-4 rounded-lg shadow hover:bg-[#aee8ea] transition duration-200"
              onClick={handleEditGroupName}
            >
              Edit
            </button>
          </div>
          <p className="mt-2 text-xl font-bold text-gray-700">{groupName}</p>
        </div>

        {/* Add More People */}
        <button
          className="w-full bg-[#234F3D] text-white py-3 rounded-lg shadow-lg font-semibold hover:bg-[#1b3c2f] transition duration-200"
          onClick={handleAddMember}
        >
          Add More People to the Group
        </button>

        {/* Group Members */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#234F3D]">
          <h2 className="text-lg font-semibold text-[#234F3D]">Group Members</h2>
          <ul className="mt-4 space-y-3">
            {groupMembers.map((member) => (
              <li
                key={member.id}
                className="flex items-center justify-between bg-[#F0FDF4] py-3 px-4 rounded-lg shadow hover:bg-[#EAF9EE] transition duration-200"
              >
                <span className="text-gray-700">{member.User_info.name}</span>
                <span className="text-gray-500">{member.User_info.email}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Leave Group Button */}
        <button
          className="w-full bg-red-500 text-white py-3 rounded-lg shadow-lg font-semibold hover:bg-red-600 transition duration-200"
          onClick={handleLeaveGroup}
        >
          Leave Group
        </button>

        {/* Delete Group Button */}
        <button
          className="w-full bg-red-700 text-white py-3 rounded-lg shadow-lg font-semibold hover:bg-red-800 transition duration-200"
          onClick={handleDeleteGroup}
        >
          Delete Group
        </button>
      </div>
    </div>
  );
};

export default GroupSettings;
