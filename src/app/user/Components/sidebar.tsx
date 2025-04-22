"use client";

import React, { useState } from "react";
import Link from "next/link"; // Import Link from next/link
import { usePathname } from "next/navigation"; // Import usePathname to determine current route
import { FaTachometerAlt, FaFileAlt, FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname(); // Get current path
  const [selectedItem, setSelectedItem] = useState<string>(
    getInitialSelectedItem(pathname)
  );

  // Helper function to set initial selected item based on the current route
  function getInitialSelectedItem(path: string) {
    if (path.includes("/dashboard")) return "Dashboard";
    if (path.includes("/reportpage")) return "Crime Reports";
    if (path.includes("/management")) return "User Management";
    if (path.includes("/profile")) return "Profile";
    return "Dashboard";
  }

  return (
    <aside className="w-64 min-h-screen bg-gray-50 shadow-md flex flex-col">
      {/* Navigation Links */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/user/dashboard"
              onClick={() => setSelectedItem("Dashboard")}
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
            </Link>
          </li>
          <li>
            <Link
              href="/user/reportpage"
              onClick={() => setSelectedItem("Crime Reports")}
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
            </Link>
          </li>
          <li>
            <Link
              href="/user/profile"
              onClick={() => setSelectedItem("User Management")}
              className={`flex items-center px-6 py-3 transition-colors ${
                selectedItem === "User Management"
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
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
