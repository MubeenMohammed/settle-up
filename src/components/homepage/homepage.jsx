import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logOut } from "../../superbase/auth";
import Header from "./header";
import UserInfo from "./userInfo";
import ExpenseContainer from "./expenseContainer/expenseContainer";
import { getFriendsByUserId, getGroupsByUserId, getUserByUserId, getUserTotalExpense } from "../../backendFunctions/backendFunctions";
import LoadingScreen from "../loadingScreen/loadingScreen";

export default function HomePage({ screenSize }) {
  const [onFriendsTab, setOnFriendsTab] = useState(true);
  const [user, setUser] = useState(null); // Initial user state is null
  const [loading, setLoading] = useState(true); // Add a loading state
  const [expenses, setExpenses] = useState({ owe: 0, lent: 0 }); // State to store expenses

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

  useEffect(() => {
    const fetchUserData = async () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        try {
          // Fetch user groups
          const groupData = await getGroupsByUserId(user.id);
          sessionStorage.setItem("userGroups", JSON.stringify(groupData.data));

          // Fetch user friends
          const friendsData = await getFriendsByUserId(user.id);
          sessionStorage.setItem("userFriends", JSON.stringify(friendsData.data));

          // Fetch user details
          const userData = await getUserByUserId(user.id);
          sessionStorage.setItem("user", JSON.stringify(userData.data[0]));

          // Fetch user's total expenses
          const expenseData = await getUserTotalExpense(user.id);
          console.log("Expense data:", expenseData);
          if (expenseData.status === "success") {
            console.log("Expense data:", expenseData.data);
            setExpenses({
              owe: expenseData.data.owe,
              lent: expenseData.data.lent,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const addButtonClicked = () => {
    if (onFriendsTab) {
      navigate("/add-expense");
    }
    navigate("/add-expense");
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
          name={JSON.parse(sessionStorage.getItem("user")).name}
          youAreOwed={expenses.lent} // Using fetched data
          youOwe={expenses.owe} // Using fetched data
          totalBalance={expenses.lent - expenses.owe} // Calculating total balance
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
