import React from 'react';

const UserInfo = ({ name, youAreOwed, youOwe, totalBalance }) => {
  const initial = name.charAt(0);

  return (
    <div className="bg-[#B4EBCA] pb-5 pt-3">
      <div className="flex flex-col items-center mb-4">
        <div className="w-14 h-14 rounded-full bg-white text-[#234F3D] flex items-center justify-center text-2xl font-bold mb-1">
          {initial}
        </div>
        <span className="text-[#234F3D] text-base font-semibold">{name}</span>
      </div>

      <div className="mx-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between h-16">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="text-gray-600 text-xs">You are owed</div>
            <div className="text-green-600 font-semibold text-base">$ {youAreOwed}</div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center border-x border-gray-200">
            <div className="text-gray-600 text-xs">You owe</div>
            <div className="text-red-600 font-semibold text-base">$ {youOwe}</div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="text-gray-600 text-xs">Total Balance</div>
            <div className="text-[#234F3D] font-semibold text-base">$ {totalBalance}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
