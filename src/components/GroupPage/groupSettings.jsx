import React, { useState } from 'react';

const GroupSettings = () => {
  const [groupName, setGroupName] = useState("My Group");
  const [groupMembers, setGroupMembers] = useState(["User 1", "User 2", "User 3"]);

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
    if (window.confirm("Are you sure you want to delete the group? This action cannot be undone.")) {
      alert("Group deleted.");
      // Add actual functionality for deleting the group
    }
  };

  return (
    <div className="bg-[#B4EBCA] min-h-screen p-4 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#BCF4F5] p-4 rounded-md shadow-md">
        <button
          className="text-xl text-black"
          onClick={() => window.history.back()}
        >
          &#8592;
        </button>
        <h1 className="text-lg font-bold text-black">Group Settings</h1>
      </div>

      {/* Body */}
      <div className="mt-4 space-y-4">
        {/* Group Name */}
        <div className="bg-[#D9F2B4] p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Group Name:</span>
            <button
              className="bg-[#BCF4F5] text-black py-1 px-3 rounded-md shadow hover:bg-[#aee8ea]"
              onClick={handleEditGroupName}
            >
              Edit
            </button>
          </div>
          <p className="mt-2 text-lg font-bold">{groupName}</p>
        </div>

        {/* Add More People */}
        <button
          className="w-full bg-[#BCF4F5] text-black py-2 rounded-md shadow-md font-semibold hover:bg-[#aee8ea]"
          onClick={handleAddMember}
        >
          Add More People to the Group
        </button>

        {/* Group Members */}
        <div className="bg-[#D9F2B4] p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Group Members</h2>
          <ul className="space-y-2">
            {groupMembers.map((member, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-white py-2 px-3 rounded-md shadow-md"
              >
                <span>{member}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Leave Group Button */}
        <button
          className="w-full bg-red-500 text-white py-2 rounded-md shadow-md font-semibold hover:bg-red-600"
          onClick={handleLeaveGroup}
        >
          Leave Group
        </button>

        {/* Delete Group Button */}
        <button
          className="w-full bg-red-700 text-white py-2 rounded-md shadow-md font-semibold hover:bg-red-800"
          onClick={handleDeleteGroup}
        >
          Delete Group
        </button>
      </div>
    </div>
  );
};

export default GroupSettings;
