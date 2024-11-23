import React from "react";

export default function GroupsTab({ groups }) {
  return (
    <div className="p-3">
      {groups.map((group, index) => (
        <div
          key={index}
          className="flex items-center justify-between mb-3 bg-white p-3 rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            <div
              className={`w-9 h-9 rounded-full ${
                group.owes ? 'bg-red-500' : 'bg-green-500'
              } text-white flex items-center justify-center font-semibold mr-3`}
            >
              {group.name.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-sm text-[#234F3D]">
                {group.name}
              </div>
              <div className="text-xs text-gray-500">
                {group.owes ? `You owe ${group.to}` : `${group.to} owes you`}
              </div>
            </div>
          </div>
          <div
            className={`font-semibold text-sm ${
              group.owes ? 'text-red-500' : 'text-green-500'
            }`}
          >
            $ {group.amount}
          </div>
        </div>
      ))}
    </div>
  );
}
