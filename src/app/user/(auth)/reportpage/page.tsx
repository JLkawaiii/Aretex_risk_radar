"use client";

import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaThLarge,
  FaList,
  FaFilter,
} from "react-icons/fa";

// Define Report interface for type safety
interface Report {
  id: number;
  title: string;
  date: string;
  time: string;
  dayOfWeek: string;
  eventProximity: string;
  location: string;
  coordinates: string;
  category: string;
  type: string;
  crimeOccurred: string;
}

const ReportPage = () => {
  // Fixed array initialization to create unique objects
  const [reports] = useState<Report[]>(
    Array(20)
      .fill(0)
      .map((_, i) => ({
        id: 232 + i,
        title: "Homicide",
        date: "2023-09-07T00:00:00.000Z",
        time: "22:30",
        dayOfWeek: "Thu",
        eventProximity: "1km",
        location: "1732, Brgy. 1, Ilocos Norte, Region 1",
        coordinates: "N/A",
        category: "Homicide",
        type: "Violence",
        crimeOccurred: "Indoor",
      }))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const tilesPerPage = 6;
  const [crimeFilter, setCrimeFilter] = useState("Homicide");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Pagination logic
  const indexOfLastTile = currentPage * tilesPerPage;
  const indexOfFirstTile = indexOfLastTile - tilesPerPage;
  const currentTiles = reports.slice(indexOfFirstTile, indexOfLastTile);
  const totalPages = Math.ceil(reports.length / tilesPerPage);

  const toggleRowExpansion = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  // Improved date formatting with error handling
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Crime Reports</h1>
          <p className="text-sm text-gray-500">Track crime incident records</p>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-blue-600 hover:text-white flex items-center"
              onClick={() => setIsFilterOpen((prev) => !prev)}
            >
              <FaFilter className="mr-2 text-gray-600" />
              {crimeFilter}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isFilterOpen && (
              <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {/* Filter out the currently selected option */}
                {["Homicide", "Gambling", "Rape", "Theft"]
                  .filter((option) => option !== crimeFilter)
                  .map((option) => (
                    <button
                      key={option}
                      className="w-full px-4 py-3 text-left hover:text-orange-500 hover:bg-gray-50"
                      onClick={() => {
                        setCrimeFilter(option);
                        setIsFilterOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          {/* View Button */}
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className={`px-4 py-2 rounded-lg flex items-center ${
              isDropdownOpen
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-600 hover:text-white"
            }`}
          >
            View
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                className="w-full px-4 py-2 text-left text-gray-800 hover:text-orange-500 hover:bg-gray-100 flex items-center"
                onClick={() => {
                  setViewMode("grid");
                  setIsDropdownOpen(false);
                }}
              >
                <FaThLarge className="mr-2 text-gray-600" />
                Large Icon
              </button>
              <button
                className="w-full px-4 py-2 text-left text-gray-800 hover:text-orange-500 hover:bg-gray-100 flex items-center"
                onClick={() => {
                  setViewMode("list");
                  setIsDropdownOpen(false);
                }}
              >
                <FaList className="mr-2 text-gray-600" />
                List
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentTiles.map((report, index) => (
            <div
              key={`grid-${report.id}-${index}`}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {report.id} {report.title}
                </h2>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Crime ID:</strong> {report.id}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {formatDate(report.date)}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Time:</strong> {report.time}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Day of the week:</strong> {report.dayOfWeek}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Event proximity:</strong> {report.eventProximity}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {report.location}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Coordinates:</strong> {report.coordinates}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Crime type category:</strong> {report.category}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Crime Type:</strong> {report.type}
              </p>
            </div>
          ))}
        </div>
      ) : (
        // List View (New)
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          {/* Table Header */}
          <div className="bg-gray-100 border-b border-gray-200">
            <div className="flex items-center py-2 px-4 font-medium text-gray-600 text-sm">
              <div className="w-16">ID</div>
              <div className="w-32">Title</div>
              <div className="w-28">Date</div>
              <div className="w-24">Time</div>
              <div className="w-40">Day of the week</div>
              <div className="ml-auto w-28 text-center">Actions</div>
            </div>
          </div>

          <div className="w-full">
            {currentTiles.map((report, index) => (
              <div
                key={`list-${report.id}-${index}`}
                className="border-b border-gray-200 last:border-b-0"
              >
                <div className="flex items-center py-3 px-4 hover:bg-gray-50 cursor-pointer">
                  <div className="w-16 font-semibold text-gray-700">
                    {report.id}
                  </div>
                  <div className="w-32 font-semibold text-gray-700">
                    {report.title}
                  </div>
                  <div className="w-28 text-gray-600 text-sm">
                    {formatDate(report.date)}
                  </div>
                  <div className="w-24 text-gray-600 text-sm">
                    {report.time}
                  </div>
                  <div className="w-40 text-gray-600 text-sm">
                    {report.dayOfWeek}
                  </div>
                  <div className="ml-auto flex items-center justify-end">
                    <button
                      onClick={() => toggleRowExpansion(index)}
                      className="text-gray-500 hover:text-gray-700"
                      title={
                        expandedRow === index
                          ? "Collapse details"
                          : "Expand details"
                      }
                    >
                      {expandedRow === index ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded details */}
                {expandedRow === index && (
                  <div className="bg-white border-t border-gray-200 px-4 py-3 text-sm">
                    <div className="flex">
                      {/* Left Column */}
                      <div className="w-1/3">
                        <div className="mb-2">
                          <span className="inline-block w-28 text-gray-700">
                            Time:
                          </span>
                          <span className="text-gray-900">{report.time}</span>
                        </div>
                        <div className="mb-2">
                          <span className="inline-block w-28 text-gray-700">
                            Day of the week:
                          </span>
                          <span className="text-gray-900">
                            {report.dayOfWeek}
                          </span>
                        </div>
                        <div className="mb-2">
                          <span className="inline-block w-28 text-gray-700">
                            Event Proximity:
                          </span>
                          <span className="text-gray-900">
                            {report.eventProximity}
                          </span>
                        </div>
                      </div>

                      {/* Middle Column */}
                      <div className="w-1/3">
                        <div className="mb-2">
                          <span className="inline-block w-28 text-gray-700">
                            Crime occurred:
                          </span>
                          <span className="text-gray-900">
                            {report.crimeOccurred}
                          </span>
                        </div>
                        <div className="mb-2">
                          <span className="inline-block w-28 text-gray-700">
                            Location:
                          </span>
                          <span className="text-gray-900">
                            {report.location}
                          </span>
                        </div>
                        <div className="mb-2">
                          <span className="inline-block w-28 text-gray-700">
                            Coordinate:
                          </span>
                          <span className="text-gray-900">
                            {report.coordinates}
                          </span>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="w-1/3">
                        <div className="mb-2">
                          <span className="inline-block w-28 text-gray-700">
                            Crime type category:
                          </span>
                          <span className="text-gray-900">
                            {report.category}
                          </span>
                        </div>
                        <div className="mb-2">
                          <span className="inline-block w-28 text-gray-700">
                            Crime type:
                          </span>
                          <span className="text-gray-900">{report.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg shadow-md ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white"
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg shadow-md ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg shadow-md ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReportPage;
