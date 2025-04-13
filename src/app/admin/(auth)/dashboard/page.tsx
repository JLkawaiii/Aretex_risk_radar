"use client";

import React, { useState } from "react";
import { FaFilter, FaShieldAlt, FaCloud, FaTint } from "react-icons/fa";

const DashboardPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Crime");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow-md px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Visualization</h1>
          <p className="text-sm text-gray-600">
            Visualize Crime, Flood, and Weather Reports
          </p>
        </div>
      </header>

      {/* Tabs Section */}
      <div className="flex justify-end space-x-4 px-8 py-4">
        <button
          onClick={() => handleTabClick("Crime")}
          className={`flex items-center px-6 py-3 rounded-lg font-semibold shadow-md ${
            activeTab === "Crime"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white"
          }`}
        >
          <FaShieldAlt className="mr-2" />
          Crime
        </button>
        <button
          onClick={() => handleTabClick("Weather")}
          className={`flex items-center px-6 py-3 rounded-lg font-semibold shadow-md ${
            activeTab === "Weather"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white"
          }`}
        >
          <FaCloud className="mr-2" />
          Weather
        </button>
        <button
          onClick={() => handleTabClick("Flood")}
          className={`flex items-center px-6 py-3 rounded-lg font-semibold shadow-md ${
            activeTab === "Flood"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white"
          }`}
        >
          <FaTint className="mr-2" />
          Flood
        </button>
      </div>

      {/* Main Content */}
      <div className="col-span-8 bg-white rounded-lg shadow-md p-8">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className={`flex items-center px-6 py-3 font-semibold rounded-lg shadow-md mb-6 ${
              isDropdownOpen
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white"
            }`}
          >
            <FaFilter className="mr-2" />
            Filter
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-48">
              <ul className="py-2">
                <li
                  onClick={() => setSelectedFilter("Heat Map")}
                  className={`px-4 py-2 cursor-pointer transition-colors ${
                    selectedFilter === "Heat Map"
                      ? "bg-gray-100 text-orange-500"
                      : "hover:bg-gray-100 hover:text-orange-500"
                  }`}
                >
                  Heat Map
                </li>
                <li
                  onClick={() => setSelectedFilter("Incident Status Map")}
                  className={`px-4 py-2 cursor-pointer transition-colors ${
                    selectedFilter === "Incident Status Map"
                      ? "bg-gray-100 text-orange-500"
                      : "hover:bg-gray-100 hover:text-orange-500"
                  }`}
                >
                  Incident Status Map
                </li>
                <li
                  onClick={() => setSelectedFilter("Crime Location Map")}
                  className={`px-4 py-2 cursor-pointer transition-colors ${
                    selectedFilter === "Crime Location Map"
                      ? "bg-gray-100 text-orange-500"
                      : "hover:bg-gray-100 hover:text-orange-500"
                  }`}
                >
                  Crime Location Map
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Crime Graph */}
        <div className="col-span-3 bg-gray-50 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Crime Map</h3>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Graph Placeholder</p>
          </div>
        </div>
      </div>

      {/* Graph Visualization */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Crime Graph</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="text-gray-600">46% Legend</p>
              <p className="text-gray-600">+25%</p>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="text-gray-600">46% Legend</p>
              <p className="text-gray-600">+25%</p>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="text-gray-600">46% Legend</p>
              <p className="text-gray-600">+25%</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-gray-50 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Graph Visualization
          </h3>
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Graph Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
