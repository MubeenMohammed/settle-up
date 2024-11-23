import React from "react";

export default function FriendsTab({ friends }) {
  return (
    <div className="p-3">
      {friends === "No Friends found" ? (
        <div className="text-center text-gray-500">No friends found</div>
      ) : (
        friends.map((friend) => (
          <div
            key={friend.friend_id}
            className="flex items-center justify-between mb-3 bg-white p-3 rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              {/* Friend Icon */}
              <div
                className={`w-9 h-9 rounded-full
                 bg-green-500 text-white flex items-center justify-center font-semibold mr-3`}
              >
                {friend.friend_name.charAt(0).toUpperCase()}
              </div>
              {/* Friend Details */}
              <div>
                <div className="font-medium text-sm text-[#234F3D]">
                  {friend.friend_name}
                </div>
                {/* <div className="text-xs text-gray-500">
                  {friend.owes ? "You owe" : "Owes you"}
                </div> */}
              </div>
            </div>
            {/* Amount */}
            {/* <div
              className={`font-semibold text-sm ${
                friend.owes ? "text-red-500" : "text-green-500"
              }`}
            >
              $ {friend.amount}
            </div> */}
          </div>
        ))
      )}
    </div>
  );
}
