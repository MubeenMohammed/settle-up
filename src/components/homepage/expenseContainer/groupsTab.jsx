import React from "react";

export default function GroupsTab({ groups }) {
  return (
    <div className="p-3">
      {!groups || groups === "No groups found" ? (
        <>
          <div className="text-center text-gray-500">No groups found</div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all"
              onClick={() => alert("Add more groups functionality goes here!")}
            >
              Add More Groups
            </button>
          </div>
        </>
      ) : (
        <>
          {Array.isArray(groups) && groups.map((group) => (
            <div
              key={group.group_id}
              className="flex items-center justify-between mb-3 bg-white p-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                {/* Group Icon */}
                <div
                  className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold mr-3"
                >
                  {group.group_name.charAt(0).toUpperCase()}
                </div>
                {/* Group Details */}
                <div>
                  <div className="font-medium text-sm text-[#234F3D]">
                    {group.group_name}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all"
              onClick={() => alert("Add more groups functionality goes here!")}
            >
              Add More Groups
            </button>
          </div>
        </>
      )}
    </div>
  );
}