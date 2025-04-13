"use client";

import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaFileAlt,
  FaUsers,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState<string>("Dashboard"); // Track the selected item

  return (
    <aside className="w-64 min-h-screen bg-gray-50 shadow-md flex flex-col">
      {/* Navigation Links */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          <li>
            <a
              href="#dashboard"
              onClick={() => setSelectedItem("Dashboard")} // Set selected item
              className={`flex items-center px-6 py-3 transition-colors ${
                selectedItem === "Dashboard"
                  ? "bg-gray-100 text-orange-500"
                  : "text-gray-800 hover:bg-gray-100 hover:text-orange-500"
              }`}
            >
              <FaTachometerAlt
                className={`mr-3 ${
                  selectedItem === "Dashboard" ? "text-orange-500" : ""
                }`}
              />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#crime-reports"
              onClick={() => setSelectedItem("Crime Reports")} // Set selected item
              className={`flex items-center px-6 py-3 transition-colors ${
                selectedItem === "Crime Reports"
                  ? "bg-gray-100 text-orange-500"
                  : "text-gray-800 hover:bg-gray-100 hover:text-orange-500"
              }`}
            >
              <FaFileAlt
                className={`mr-3 ${
                  selectedItem === "Crime Reports" ? "text-orange-500" : ""
                }`}
              />
              <span>Crime Reports</span>
            </a>
          </li>
          <li>
            <a
              href="#user-management"
              onClick={() => setSelectedItem("User Management")} // Set selected item
              className={`flex items-center px-6 py-3 transition-colors ${
                selectedItem === "User Management"
                  ? "bg-gray-100 text-orange-500"
                  : "text-gray-800 hover:bg-gray-100 hover:text-orange-500"
              }`}
            >
              <FaUsers
                className={`mr-3 ${
                  selectedItem === "User Management" ? "text-orange-500" : ""
                }`}
              />
              <span>User Management</span>
            </a>
          </li>
          <li>
            <a
              href="#profile"
              onClick={() => setSelectedItem("Profile")} // Set selected item
              className={`flex items-center px-6 py-3 transition-colors ${
                selectedItem === "Profile"
                  ? "bg-gray-100 text-orange-500"
                  : "text-gray-800 hover:bg-gray-100 hover:text-orange-500"
              }`}
            >
              <FaUserCircle
                className={`mr-3 ${
                  selectedItem === "Profile" ? "text-orange-500" : ""
                }`}
              />
              <span>Profile</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
