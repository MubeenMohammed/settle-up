import React from "react";

export default function GroupUI({ group }) {
  const backgroundColor = "#D9F2B4"; // Background color from the branding
  const cardColor = "#B4EBCA"; // Card color from the branding

  return (
    <div style={{ backgroundColor }} className="h-screen w-full overflow-auto">
      {/* Settings Icon */}
      <div className="flex justify-end p-4">
        <button aria-label="Settings" className="text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m0-10v6m-4 4v4m8-4v4m-6-8h6m0-8h-6"
            />
          </svg>
        </button>
      </div>

      {/* Group Name */}
      <div className="text-center p-4">
        <div className="font-bold text-lg text-[#234F3D]">{group.group_name}</div>
        <div className="text-sm text-gray-500">
          {group.member_balance > 0
            ? `You lent CA$${group.member_balance}`
            : group.member_balance < 0
            ? `You borrowed CA$${Math.abs(group.member_balance)}`
            : "All settled up!"}
        </div>
      </div>

      {/* Transactions List */}
      <div className="p-4">
        {group.transactions.length === 0 ? (
          <div className="text-center text-gray-500">No transactions found</div>
        ) : (
          group.transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-4 p-4 rounded-lg shadow-sm"
              style={{ backgroundColor: cardColor }}
            >
              <div>
                {/* Transaction Details */}
                <div className="font-medium text-sm text-[#234F3D]">
                  {transaction.description}
                </div>
                <div className="text-xs text-gray-500">
                  {transaction.date}
                </div>
              </div>
              <div
                className={`font-semibold text-sm ${
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
      </div>
    </div>
  );
}
