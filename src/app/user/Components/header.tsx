"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleEditProfile = () => {
    setIsDropdownOpen(false);
    router.push("/admin/profile");
  };

  const handleSignOut = () => {
    // Add any logout logic here (clear tokens, cookies, etc.)
    setIsDropdownOpen(false);
    router.push("/");
  };

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-gray-100 shadow-md h-16">
      {/* Left Section: Logo */}
      <div className="flex items-center">
        <img src="/riskradar.png" alt="Risk Radar Logo" className="h-11 mr-1" />
        <div className="flex items-center space-x-1">
          <img src="/aretex.png" alt="Aretex" className="h-5" />
          <span className="text-xl h-6 font-bold text-red-500">RISK</span>
          <span className="text-xl h-6 font-bold text-gray-800">RADAR</span>
        </div>
      </div>

      {/* Right Section: User Info */}
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-gray-800 font-semibold">John Lloyd</p>
        </div>
        <img
          src="/profile.jpg"
          alt="User Profile"
          className="w-10 h-10 rounded-full border-2 border-orange-500"
        />
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center px-4 py-1 bg-orange-500 text-white font-semibold rounded-lg shadow-md"
          >
            User
            <FaChevronDown className="ml-2" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-40">
              <ul className="py-2">
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-orange-500 transition-colors"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-orange-500 transition-colors"
                  onClick={handleSignOut}
                >
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
