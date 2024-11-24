import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGroupExpense } from "../../../backendFunctions/backendFunctions";

export default function GroupsTab({ groups, setOnFriendsTab }) {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState({}); // State to store owe and lent data for each group

  // Fetch owe and lent data for each group
  useEffect(() => {
    const fetchExpenses = async () => {
      if (Array.isArray(groups)) {
        const userId = JSON.parse(sessionStorage.getItem("user")).id; 
        const newExpenses = {};

        // Fetch expense data for each group
        for (const group of groups) {
          try {
            const response = await getGroupExpense(group.group_id, userId);
            if (response.status === "success") {
              newExpenses[group.group_id] = response.data; // Store expense data by group_id
            } else {
              console.error(`Failed to fetch expenses for group ${group.group_id}`);
            }
          } catch (error) {
            console.error(`Error fetching expenses for group ${group.group_id}:`, error);
          }
        }

        setExpenses(newExpenses); // Update state with fetched data
      }
    };

    fetchExpenses();
  }, [groups]);

  const handleGroupClick = (group) => {
    console.log("Group clicked");
    navigate("/group-details", { state: { group } });
  };

  return (
    <div className="p-3">
      {!groups || groups === "No groups found" ? (
        <>
          <div className="text-center text-gray-500">No groups found</div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all"
              onClick={() => navigate("/add-group")}
            >
              Add More Groups
            </button>
          </div>
        </>
      ) : (
        <>
          {Array.isArray(groups) &&
            groups.map((group) => (
              <div
                key={group.group_id}
                className="flex items-center justify-between mb-3 bg-white p-3 rounded-lg shadow-sm"
                onClick={() => handleGroupClick(group)}
              >
                <div className="flex items-center">
                  {/* Group Icon */}
                  <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold mr-3">
                    {group.group_name.charAt(0).toUpperCase()}
                  </div>
                  {/* Group Details */}
                  <div>
                    <div className="font-medium text-sm text-[#234F3D]">
                      {group.group_name}
                    </div>
                    {/* Additional Info: You Owe and You Lent */}
                    <div className="text-xs text-gray-500">
                    {expenses[group.group_id] ? (
                        <>
                        <div>
                            <span className="text-red-600">
                            You Owe: ${expenses[group.group_id].owe ?? 0}
                            </span>
                        </div>
                        <div>
                            <span className="text-green-600">
                            You Lent: ${expenses[group.group_id].lent ?? 0}
                            </span>
                        </div>
                        </>
                    ) : (
                        <span className="text-gray-600">Loading...</span>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all"
              onClick={() => navigate("/add-group")}
            >
              Add More Groups
            </button>
          </div>
        </>
      )}
    </div>
  );
}
