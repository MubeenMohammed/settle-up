import React from "react";
import FriendsTab from "./friendsTab";
import GroupsTab from "./groupsTab";

const ExpenseContainer = ({ friends, groups, onFriendsTab, setOnFriendsTab }) => {

  return (
    <div className="bg-[#D9F2B4] flex-1">
      <div className="flex border-b">
        <button
          className={`flex-1 py-2.5 text-sm text-center font-medium ${
            onFriendsTab
              ? "text-[#234F3D] border-b-2 border-[#234F3D]"
              : "text-gray-500"
          }`}
          onClick={() => setOnFriendsTab(true)}
        >
          FRIENDS
        </button>
        <button
          className={`flex-1 py-2.5 text-sm text-center font-medium ${
            !onFriendsTab
              ? "text-[#234F3D] border-b-2 border-[#234F3D]"
              : "text-gray-500"
          }`}
          onClick={() => setOnFriendsTab(false)}
        >
          GROUPS
        </button>
      </div>
      {onFriendsTab ? (
        <FriendsTab friends={friends} />
      ) : (
        <GroupsTab groups={groups} />
      )}
    </div>
  );
};

export default ExpenseContainer;
