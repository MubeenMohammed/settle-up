import React from "react";

export default function FriendsTab({ friends }) {
  return (
    <div className="p-3">
      {!friends || friends === "No Friends found" ? (
        <>
          <div className="text-center text-gray-500">No friends found</div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all"
              onClick={() => alert("Add more friends functionality goes here!")}
            >
              Add More Friends
            </button>
          </div>
        </>
      ) : (
        <>
          {Array.isArray(friends) && friends.map((friend) => (
            <div
              key={friend.friend_id}
              className="flex items-center justify-between mb-3 bg-white p-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                {/* Friend Icon */}
                <div
                  className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold mr-3"
                >
                  {friend.friend_name.charAt(0).toUpperCase()}
                </div>
                {/* Friend Details */}
                <div>
                  <div className="font-medium text-sm text-[#234F3D]">
                    {friend.friend_name}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all"
              onClick={() => alert("Add more friends functionality goes here!")}
            >
              Add More Friends
            </button>
          </div>
        </>
      )}
    </div>
  );
}