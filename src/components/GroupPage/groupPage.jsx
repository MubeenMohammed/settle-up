import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Settings, ChevronLeft } from "lucide-react";
import { getGroupDetailsByGroupId } from "../../backendFunctions/backendFunctions";

export default function GroupUI({ screenWidth }) {
  const backgroundColor = "#D9F2B4";
  const cardColor = "#B4EBCA";
  const isSmallScreen = screenWidth <= 768;
  const Navigate = useNavigate();

  const location = useLocation();
  const { group } = location.state || {};

  const handleBackClick = () => {
    Navigate("/home");
  };

  const handleSettingsClick = async (group) => {
    const groupDetails = await getGroupDetailsByGroupId(group.group_id);
    console.log(groupDetails);
    if (groupDetails) {
        sessionStorage.setItem("groupDetails", JSON.stringify(groupDetails.data));
    }
    Navigate("/group-settings", { state: { group } });
  };



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
    <div style={{ backgroundColor }} className="h-screen w-full overflow-auto">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between p-4">
        <button
          aria-label="Back"
          className="flex items-center gap-2 text-[#234F3D] bg-white rounded-xl p-2.5 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out active:scale-95"
          onClick={handleBackClick}
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2} />
          <span className="font-medium">Back</span>
        </button>
        <button
          aria-label="Settings"
          className="hover:bg-white/90 bg-white rounded-xl p-2.5 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md active:scale-95"
          onClick={() => handleSettingsClick(group)}
        >
          <Settings className="w-5 h-5 text-[#234F3D]" strokeWidth={1.5} />
        </button>
      </div>

      {/* Group Info */}
      <div className="text-center px-4 pb-4">
        <div
          className={`font-bold ${
            isSmallScreen ? "text-md" : "text-lg"
          } text-[#234F3D]`}
        >
          {group.group_name}
        </div>
        <div className="text-sm text-gray-500">
          Created By {group.created_by}
        </div>
      </div>

      {/* Transactions Header */}
      <div className="px-4 py-2 border-b-2 border-[#234F3D]">
        <h2
          className={`font-semibold ${
            isSmallScreen ? "text-md" : "text-lg"
          } text-[#234F3D]`}
        >
          Transactions
        </h2>
      </div>

      {/* Transactions List */}
      {/* <div className="p-4">
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
