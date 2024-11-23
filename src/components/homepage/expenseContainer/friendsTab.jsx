import React from "react";

export default function FriendsTab({expenses}) {
    return (
        <div className="p-3">
        {expenses.map((expense, index) => (
          <div
            key={index}
            className="flex items-center justify-between mb-3 bg-white p-3 rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <div
                className={`w-9 h-9 rounded-full ${
                  expense.owes ? 'bg-red-500' : 'bg-green-500'
                } text-white flex items-center justify-center font-semibold mr-3`}
              >
                {expense.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-sm text-[#234F3D]">
                  {expense.name}
                </div>
                <div className="text-xs text-gray-500">
                  {expense.owes ? 'you owe' : 'owes you'}
                </div>
              </div>
            </div>
            <div
              className={`font-semibold text-sm ${
                expense.owes ? 'text-red-500' : 'text-green-500'
              }`}
            >
              $ {expense.amount}
            </div>
          </div>
        ))}
      </div>
    )
}