import React from 'react';
import { Menu, Search, MoreVertical } from 'lucide-react';

const Header = () => {
  return (
    <div className="h-14 flex items-center justify-between bg-[#B4EBCA] px-4">
      <Menu className="w-6 h-6 text-[#234F3D]" />
      <span className="text-lg font-semibold text-[#234F3D]">SPLIT UP</span>
      <div className="flex items-center gap-3">
        <Search className="w-6 h-6 text-[#234F3D]" />
        <MoreVertical className="w-6 h-6 text-[#234F3D]" />
      </div>
    </div>
  );
};

export default Header;
