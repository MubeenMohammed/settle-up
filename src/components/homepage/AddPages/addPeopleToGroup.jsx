import React, { useState } from "react";
import { ArrowLeft } from "lucide-react"; // Importing the Lucide back arrow icon
import {
  addMembersToGroup,
  getGroupDetailsByGroupId,
} from "../../../backendFunctions/backendFunctions";
import { useNavigate } from "react-router-dom";

const AddMorePeopleToGroupPage = ({ screenWidth }) => {
  const navigate = useNavigate(); // Correct hook for navigation
  const padding = screenWidth < 400 ? "p-4" : "p-6";
  const fontSize = screenWidth < 400 ? "text-sm" : "text-base";

  // State to store the selected friend
  const [selectedFriend, setSelectedFriend] = useState("");

  // Logic when the Add to Group button is clicked
  const addFriendToGroupClicked = async () => {
    if (selectedFriend) {
      try {
        // Call the API to add the member
        const groupId = JSON.parse(
          sessionStorage.getItem("groupDetails")
        ).group.group_id;
        const response = await addMembersToGroup(groupId, selectedFriend);
        console.log(response);

        if (response.status === "success") {
          // Fetch updated group details
          const data = await getGroupDetailsByGroupId(groupId);

          // Update sessionStorage with new group details
          sessionStorage.setItem("groupDetails", JSON.stringify(data.data));

          // Navigate to the home page
          navigate("/home");
        } else {
          // Handle error response from addMembersToGroup
          alert("Failed to add the friend to the group. Please try again.");
        }
      } catch (error) {
        console.error("Error adding friend to group:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Please select a friend to add to the group.");
    }
  };

  return (
    <div className={`w-full h-screen bg-[#FFFFFF]`}>
      {/* Header */}
      <div className={`bg-[#BCF4F5] flex items-center ${padding} shadow-md`}>
        <button
          className="mr-4 text-[#333] hover:text-[#B4EBCA] focus:outline-none"
          onClick={() => window.history.back()} // Navigates back in history
        >
          {/* Lucide Back Arrow Icon */}
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className={`font-bold text-[#333] text-lg`}>Add More People</h1>
          <p className={`text-[#333] ${fontSize}`}>
            Select a friend to add to the group.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className={`mt-6 px-6`}>
        {/* Select Friend */}
        <div className="mb-6">
          <label
            htmlFor="selectFriend"
            className={`block font-medium text-[#333] mb-2`}
          >
            Select a Friend:
          </label>
          <select
            id="selectFriend"
            className="w-full p-3 border border-[#B4EBCA] rounded-md focus:outline-none focus:ring focus:ring-[#D9F2B4]"
            value={selectedFriend}
            onChange={(e) => setSelectedFriend(e.target.value)} // Update state when a friend is selected
          >
            <option value="">Choose a friend</option>
            {JSON.parse(sessionStorage.getItem("userFriends")).map((friend) => (
              <option key={friend.friend_id} value={friend.friend_id}>
                {friend.friend_name}
              </option>
            ))}
          </select>
        </div>

        {/* Add to Group Button */}
        <div className="mt-6">
          <button
            className="w-full bg-[#3e9762] text-white py-3 rounded-md hover:bg-[#D9F2B4] focus:outline-none focus:ring focus:ring-[#D9F2B4] text-center font-medium"
            onClick={addFriendToGroupClicked}
          >
            Add to Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMorePeopleToGroupPage;
