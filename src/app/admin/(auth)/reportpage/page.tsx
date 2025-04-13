"use client";

import React, { useState } from "react";
import {
  FaTrash,
  FaEdit,
  FaChevronDown,
  FaChevronUp,
  FaThLarge,
  FaList,
  FaFilter,
  FaTimes,
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
  const [reports, setReports] = useState<Report[]>(
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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState<
    (Report & { index: number }) | null
  >(null);

  const [editFormData, setEditFormData] = useState<Partial<Report>>({});

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<
    (Report & { index: number }) | null
  >(null);

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

  // Handle edit button click
  const handleEditClick = (report: Report, index: number) => {
    setCurrentReport({ ...report, index: indexOfFirstTile + index });
    setEditFormData({ ...report });
    setIsEditModalOpen(true);
  };

  // Handle delete button click
  const handleDeleteClick = (report: Report, index: number) => {
    setReportToDelete({ ...report, index: indexOfFirstTile + index });
    setIsDeleteModalOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (reportToDelete) {
      const updatedReports = [...reports];
      updatedReports.splice(reportToDelete.index, 1);
      setReports(updatedReports);

      // Close the delete modal
      setIsDeleteModalOpen(false);
      setReportToDelete(null);

      if (currentTiles.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentReport) {
      const updatedReports = [...reports];

      const updatedReport: Report = {
        ...reports[currentReport.index],

        ...editFormData,

        id: currentReport.id,
      };

      // Update the report at the specified index
      updatedReports[currentReport.index] = updatedReport;

      setReports(updatedReports);

      // Close the modal
      setIsEditModalOpen(false);
      setCurrentReport(null);
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
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          + Insert Crime Data
        </button>
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {report.id} {report.title}
                </h2>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    title="Edit"
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() => handleEditClick(report, index)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    title="Delete"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDeleteClick(report, index)}
                  >
                    <FaTrash />
                  </button>
                </div>
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
                  <div className="ml-auto flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      title="Edit"
                      className="text-blue-500 hover:text-blue-600"
                      onClick={() => handleEditClick(report, index)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteClick(report, index)}
                    >
                      <FaTrash />
                    </button>
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
      {/* Edit Modal */}
      {isEditModalOpen && currentReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Edit Crime Report #{currentReport.id}
              </h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setCurrentReport(null);
                  setEditFormData({});
                }}
                className="text-gray-500 hover:text-gray-700"
                title="Close"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* First column */}
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title ?? ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={
                        editFormData.date ? formatDate(editFormData.date) : ""
                      }
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={editFormData.time ?? ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                {/* Second column */}
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="dayOfWeek"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Day of Week
                    </label>
                    <select
                      id="dayOfWeek"
                      name="dayOfWeek"
                      value={editFormData.dayOfWeek ?? ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select day</option>
                      <option value="Mon">Monday</option>
                      <option value="Tue">Tuesday</option>
                      <option value="Wed">Wednesday</option>
                      <option value="Thu">Thursday</option>
                      <option value="Fri">Friday</option>
                      <option value="Sat">Saturday</option>
                      <option value="Sun">Sunday</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Proximity
                    </label>
                    <input
                      type="text"
                      name="eventProximity"
                      value={editFormData.eventProximity ?? ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="crimeOccurred"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Crime Occurred
                    </label>
                    <select
                      id="crimeOccurred"
                      name="crimeOccurred"
                      value={editFormData.crimeOccurred ?? ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select location</option>
                      <option value="Indoor">Indoor</option>
                      <option value="Outdoor">Outdoor</option>
                    </select>
                  </div>
                </div>

                {/* Third column */}
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={editFormData.category ?? ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      value={editFormData.type ?? ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Location and coordinates - full width */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={editFormData.location ?? ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coordinates
                </label>
                <input
                  type="text"
                  name="coordinates"
                  value={editFormData.coordinates ?? ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Action buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setCurrentReport(null);
                    setEditFormData({});
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-100 rounded-lg w-full max-w-md p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 p-3 rounded-full mb-4">
                <FaTrash className="text-red-500 text-2xl" />
              </div>

              <h2 className="text-lg font-semibold mb-2">
                You are about to delete this crime report
              </h2>

              <p className="text-gray-600 text-sm mb-6">
                This will delete the current crime crime report on the list
                <br />
                Are you sure?
              </p>

              <div className="flex justify-center space-x-3 w-full">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportPage;
