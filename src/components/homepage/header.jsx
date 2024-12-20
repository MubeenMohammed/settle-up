import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { logOut } from '../../superbase/auth';



const Header = () => {
  const Navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    sessionStorage.clear();
    Navigate("/login");
  };
  
  return (
    <div className="h-14 flex items-center justify-between bg-[#B4EBCA] px-4">
      {/* Exit Door Icon */}
      <LogOut className="w-6 h-6 text-[#234F3D] cursor-pointer" onClick={handleLogout}/>
      <span className="text-lg font-semibold text-[#234F3D]">SETTLE UP</span>
      <div className="flex items-center gap-3">
      </div>
    </div>
  );
};

export default Header;