import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logOut } from "../../superbase/auth";
import Header from "./header";
import UserInfo from "./userInfo";
import ExpenseContainer from "./expenseContainer/expenseContainer";

export default function HomePage() {
  const [onFriendsTab, setOnFriendsTab] = useState(true);
  const expenses = [
    { name: 'Subodh Kothe', amount: 500, owes: true },
    { name: 'Shobhit Bakliwal', amount: 500, owes: false },
    { name: 'Firasat Durrani', amount: 500, owes: false },
    { name: 'Sushil Kumar', amount: 500, owes: true },
  ];

  const groups = [
    { name: "Trip To Lonavala", to: "Shubham", amount: 500, owes: true },
    { name: "Movie Night", to: "Shobhit Bakliwal", amount: 500, owes: false },
    { name: "Dinner at Canto", to: "Firasat Durrani", amount: 500, owes: false },
    { name: "Trip To Matheran", to: "Sushil Kumar", amount: 500, owes: true },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { user } = await getUser();
      if (!user.user) {
        navigate("/login");
      }
    };
    checkUser();
  }, [navigate]);

  const addButtonClicked = () => {
    if (onFriendsTab) {
      navigate("/add-expense");
    }
    navigate("/add-group");
  };

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <div className="w-[412px] h-[915px] mx-auto flex flex-col bg-[#D9F2B4] relative overflow-hidden">
      <Header />
      <UserInfo 
        name="Meha Bakliwal"
        youAreOwed={1500}
        youOwe={750}
        totalBalance={750}
      />
      <ExpenseContainer expenses={expenses} groups={groups} onFriendsTab={onFriendsTab} setOnFriendsTab={setOnFriendsTab}/>

      <button 
        className="absolute bottom-6 right-6 bg-[#234F3D] rounded-full flex items-center justify-center shadow-lg text-white hover:bg-[#1d3f31] transition-transform transform hover:scale-105 w-16 h-16"
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
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M12 4v16m8-8H4" 
          />
        </svg>
      </button>
    </div>
  );
}
