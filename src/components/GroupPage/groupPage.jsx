import React from "react";
import { useLocation } from "react-router-dom";
import { Settings } from "lucide-react";

export default function GroupUI({ screenWidth }) {
  const backgroundColor = "#D9F2B4";
  const cardColor = "#B4EBCA";
  const isSmallScreen = screenWidth <= 768;

  const location = useLocation();
  const { group } = location.state || {};

  // Fallback if group data is missing
  if (!group) {
    return (
      <div
        style={{ backgroundColor }}
        className="h-screen w-full flex items-center justify-center"
      >
        <div className="text-center text-gray-500">
          <h1>Error: No group data available</h1>
          <p>Return to the groups page and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor }}
      className="h-screen w-full overflow-auto"
    >
      {/* Settings Icon */}
      <div className={`flex justify-end p-4 ${isSmallScreen ? "pr-6" : "pr-5"}`}>
        <button
          aria-label="Settings"
          className="hover:bg-white/90 bg-white rounded-xl p-2.5 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md active:scale-95"
        >
          <Settings 
            className="w-5 h-5 text-[#234F3D]"
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Rest of the component remains the same */}
      <div className="text-center px-4 pb-4">
        <div
          className={`font-bold ${
            isSmallScreen ? "text-md" : "text-lg"
          } text-[#234F3D]`}
        >
          {group.group_name}
        </div>
        <div className="text-sm text-gray-500">
            Created By {group.created_by }
          {/* {group.member_balance > 0
            ? `You lent CA$${group.member_balance}`
            : group.member_balance < 0
            ? `You borrowed CA$${Math.abs(group.member_balance)}`
            : "All settled up!"} */}
        </div>
      </div>

      {/* Transactions List
      <div className="p-4">
        {group.transactions && group.transactions.length === 0 ? (
          <div className="text-center text-gray-500">No transactions found</div>
        ) : (
          group.transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-4 p-4 rounded-lg shadow-sm"
              style={{ backgroundColor: cardColor }}
            >
              <div>
                <div
                  className={`font-medium ${
                    isSmallScreen ? "text-sm" : "text-md"
                  } text-[#234F3D]`}
                >
                  {transaction.description}
                </div>
                <div
                  className={`${
                    isSmallScreen ? "text-xs" : "text-sm"
                  } text-gray-500`}
                >
                  {transaction.date}
                </div>
              </div>
              <div
                className={`font-semibold ${
                  isSmallScreen ? "text-sm" : "text-md"
                } ${
                  transaction.type === "borrowed"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {transaction.type === "borrowed"
                  ? `You borrowed`
                  : `You lent`}{" "}
                CA${transaction.amount}
              </div>
            </div>
          ))
        )}
      </div> */}
    </div>
  );
}