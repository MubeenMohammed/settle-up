import React, { useState } from "react";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { getFriendByEmail, addFriend, getFriendsByUserId } from "../../../backendFunctions/backendFunctions";
import { getUser } from "../../../superbase/auth";

export default function AddFriend({ screenSize }) {
  const [email, setEmail] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [foundUsers, setFoundUsers] = useState(null); // Dummy user

  const dynamicStyles = {
    container: {
      width: screenSize?.width,
      height: "100vh",
    },
    input: {
      fontSize: screenSize?.width < 480 ? "14px" : "16px",
    },
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSearch = async () => {
    setError("");
  
    // Validate the email input
    if (!email.trim()) {
      setError("Please enter an email ID to search");
      return;
    }
  
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
  
    setIsLoading(true);
  
    try {
      // Call the API
      const data = await getFriendByEmail(email);
  
      // Handle response
      if (data.status === "success") {
        setFoundUsers(data.data);
      } else {
        setFoundUsers("No User found");
      }
    } catch (error) {
      console.error("Error fetching user by email:", error);
      setError("An error occurred while searching. Please try again.");
    } finally {
      // Show results after the search completes
      setTimeout(() => {
        setShowResults(true);
        setIsLoading(false);
      }, 1000);
    }
  };
  

  const handleAddFriend = async (userId) => {
    try {
      setIsLoading(true);
  
      // Get the current user
      const user = await getUser();
  
      // Add the friend
      await addFriend(user.user.user.id, userId);
  
      // Fetch the updated friend list
      await getFriendsByUserId(user.user.user.id).then((data) => {
        sessionStorage.setItem("userFriends", JSON.stringify(data.data));
        });
    } catch (error) {
      console.error("Error adding friend:", error);
    } finally {
      setIsLoading(false);
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
          aria-label="Back"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-[#234F3D] flex-grow text-center">
          Add a Friend
        </h1>
        <div className="w-10" /> {/* Increased width for better alignment */}
      </div>

      {/* Email Input Section */}
      <div className="flex flex-col mb-6">
        <div className="flex items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
              setShowResults(false);
            }}
            placeholder="Enter friend's email ID"
            style={dynamicStyles.input}
            className="flex-grow border-b-2 border-[#B4EBCA] focus:outline-none focus:border-[#234F3D] text-lg text-[#234F3D] py-1 bg-transparent placeholder-gray-400 mr-2"
            disabled={isLoading}
          />
          <button
            className="bg-[#B4EBCA] hover:bg-[#D9F2B4] text-[#234F3D] px-4 py-2 rounded-md shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            onClick={handleSearch}
            disabled={isLoading || !email.trim()}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Search"
            )}
          </button>
        </div>
        {error && (
          <span className="text-red-500 text-sm mt-2">{error}</span>
        )}
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#234F3D] mb-4">
            Users found:
          </h2>
          {foundUsers!=="No User found" ?(
            <div className="space-y-4">
              {foundUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-[#D9F2B4] rounded-lg shadow-sm"
                >
                  <span className="text-[#234F3D] font-medium">{user.name}</span>
                  <button
                    className="bg-[#B4EBCA] hover:bg-[#234F3D] hover:text-white text-[#234F3D] p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleAddFriend(user.id)}
                    disabled={isLoading}
                    aria-label={`Add ${user.name} as a friend`}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 bg-[#D9F2B4] rounded-lg">
              <p className="text-[#234F3D]">No users found with this email address.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}