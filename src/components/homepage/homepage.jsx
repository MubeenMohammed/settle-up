import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logOut } from "../../superbase/auth";
import Header from "./header";
import UserInfo from "./userInfo";
import ExpenseContainer from "./expenseContainer/expenseContainer";
import { getFriendsByUserId, getGroupsByUserId } from "../../backendFunctions/backendFunctions";
import LoadingScreen from "../loadingScreen/loadingScreen";

export default function HomePage({ screenSize }) {
  const [onFriendsTab, setOnFriendsTab] = useState(true);
  const [user, setUser] = useState(null); // Initial user state is null
  const [loading, setLoading] = useState(true); // Add a loading state

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { user } = await getUser();
      if (user === null || user.user === null) { 
        navigate("/login");
      } else {
        setUser(user);
      }
      setLoading(false); 
    };
  
    checkUser();
  }, [navigate]);

  

  const addButtonClicked = () => {
    if (onFriendsTab) {
      navigate("/add-expense");
    }
    navigate("/add-group");
  };


  const dynamicStyles = {
    container: {
      width: screenSize.width,
      height: "100vh",
    },
    button: {
      width: screenSize.width < 480 ? "50px" : "60px",
      height: screenSize.width < 480 ? "50px" : "60px",
    },
  };

  return (
    !loading ? (
      <div
        style={dynamicStyles.container}
        className="mx-auto flex flex-col bg-[#D9F2B4] relative overflow-hidden"
      >
        {/* Header Section */}
        <Header />
  
        {/* User Information */}
        <UserInfo
          name="Meha Bakliwal"
          youAreOwed={1500}
          youOwe={750}
          totalBalance={750}
        />
  
        {/* Expense Container */}
        <ExpenseContainer
          friends={
            JSON.parse(sessionStorage.getItem("userFriends")) ? JSON.parse(sessionStorage.getItem("userFriends")) : "No Friends found"
          }
          groups={
            JSON.parse(sessionStorage.getItem("userGroups")) ? JSON.parse(sessionStorage.getItem("userGroups")) : "No groups found"
          }
          onFriendsTab={onFriendsTab}
          setOnFriendsTab={setOnFriendsTab}
        />
  
        {/* Add New Expense or Group Button */}
        <button
          style={dynamicStyles.button}
          className="absolute bottom-6 right-6 bg-[#234F3D] rounded-full flex items-center justify-center shadow-lg text-white hover:bg-[#1d3f31] transition-transform transform hover:scale-105"
          aria-label="Add new expense"
          onClick={addButtonClicked}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    ) : (
      <LoadingScreen />
    )
  );  
}
