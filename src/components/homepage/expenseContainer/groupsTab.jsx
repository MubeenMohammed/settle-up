import React from "react";

export default function GroupsTab({ groups }) {

  return (
    <div className="p-3">
      {groups === "No groups found" ? (
        <div className="text-center text-gray-500">No groups found</div>
      ) : (
        groups.map((group) => (
          <div
            key={group.group_id}
            className="flex items-center justify-between mb-3 bg-white p-3 rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              {/* Group Icon */}
              <div
                className={`w-9 h-9 rounded-full bg-green-500
                 text-white flex items-center justify-center font-semibold mr-3`}
              >
                {group.group_name.charAt(0).toUpperCase()}
              </div>
              {/* Group Details */}
              <div>
                <div className="font-medium text-sm text-[#234F3D]">
                  {group.group_name}
                </div>
                {/* <div className="text-xs text-gray-500">
                  {group.owes ? `You owe ${group.to}` : `${group.to} owes you`}
                </div> */}
              </div>
            </div>
            {/* Amount */}
            {/* <div
              className={`font-semibold text-sm ${
                group.owes ? "text-red-500" : "text-green-500"
              }`}
            >
              $ {group.amount}
            </div> */}
          </div>
        ))
      )}
    </div>
  );
}
