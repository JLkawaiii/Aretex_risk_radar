"use client";

import { FunnelIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
import React from "react";
import { FaShareSquare } from "react-icons/fa";

// Define User interface
interface User {
  id: number;
  name: string;
  sex: string;
  age: number;
  department: string;
  address: string;
  position?: string;
  email?: string;
  isApproved?: boolean;
  birthday?: string;
}

interface NewUserForm {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  address: string;
  position: string;
  department: string;
  email: string;
  password: string;
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Lloyd S. Brillante",
      sex: "Male",
      age: 45,
      department: "Dev team",
      address: "Brgy. Dmahanap..",
      email: "johnlloydbrillante@aretex.com.au",
      isApproved: false,
      position: "Intern",
      birthday: "12/14/2002",
    },
    {
      id: 2,
      name: "John Lloyd S. Brillante",
      sex: "Male",
      age: 56,
      department: "Dev team",
      address: "Brgy. Dmahanap..",
      position: "TL",
      email: "johnlloydbrilliante@aexrex.com.au",
      isApproved: false,
      birthday: "05/22/1999",
    },
    {
      id: 3,
      name: "John Lloyd S. Brillante",
      sex: "Male",
      age: 32,
      department: "Dev team",
      address: "Brgy. Dmahanap..",
      position: "Junior",
      email: "johnlloydbrilliante@aexrex.com.au",
      isApproved: false,
      birthday: "08/15/2000",
    },
    // Add more users to simulate a larger dataset
    ...Array.from({ length: 50 }, (_, i) => ({
      id: i + 4,
      name: `User ${i + 4}`,
      sex: i % 2 === 0 ? "Male" : "Female",
      age: 20 + i,
      department: "Dev team",
      address: `Brgy. Example ${i + 4}`,
      position: i % 3 === 0 ? "Intern" : i % 3 === 1 ? "Junior" : "TL",
      email: `user${i + 4}@example.com`,
      isApproved: false,
      birthday: `01/${(i % 28) + 1}/200${i % 9}`,
    })),
  ]);

  // State variables
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const rowsPerPage = 8;

  // Modal states
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // User selection states
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]); // To track selected users by ID
  const [selectAll, setSelectAll] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // State for expanded user details
  const [expandedUsers, setExpandedUsers] = useState<number[]>([]);

  // Form states
  const [newUserForm, setNewUserForm] = useState<NewUserForm>({
    firstName: "",
    lastName: "",
    gender: "",
    birthday: "",
    address: "",
    position: "",
    department: "",
    email: "",
    password: "",
  });

  const [editUserForm, setEditUserForm] = useState<NewUserForm>({
    firstName: "",
    lastName: "",
    gender: "",
    birthday: "",
    address: "",
    position: "",
    department: "",
    email: "",
    password: "",
  });

  // Calculate the data to display for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate total pages
  const totalPages = Math.ceil(users.length / rowsPerPage);

  // Simulate loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate a 500ms delay
    return () => clearTimeout(timer);
  }, [currentPage]);

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentRows.map((user) => user.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle individual user selection
  const handleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Handle user approval
  const handleApproveUser = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isApproved: true } : user
      )
    );
  };

  // Handle user decline
  const handleDeclineUser = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isApproved: false } : user
      )
    );
  };

  // Toggle user details expansion
  const toggleUserDetails = (userId: number) => {
    setExpandedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Handle form input changes for new user
  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUserForm({
      ...newUserForm,
      [name]: value,
    });
  };

  // Handle form input changes for edit user
  const handleEditFormInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEditUserForm({
      ...editUserForm,
      [name]: value,
    });
  };

  // Handle form submission for new user
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new user from form data
    const newUser: User = {
      id: users.length + 1,
      name: `${newUserForm.firstName} ${newUserForm.lastName}`,
      sex: newUserForm.gender,
      age: calculateAgeFromBirthday(newUserForm.birthday),
      department: newUserForm.department,
      address: newUserForm.address,
      position: newUserForm.position,
      email: newUserForm.email,
      isApproved: false,
      birthday: newUserForm.birthday,
    };

    // Add the new user to the users state
    setUsers([...users, newUser]);

    // Reset form and close modal
    setNewUserForm({
      firstName: "",
      lastName: "",
      gender: "",
      birthday: "",
      address: "",
      position: "",
      department: "",
      email: "",
      password: "",
    });
    setIsCreateModalOpen(false);
  };

  // Handle edit button click
  const handleEditClick = (user: User) => {
    // Split the name into first and last name
    const nameParts = user.name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Set the form with user data
    setEditUserForm({
      firstName,
      lastName,
      gender: user.sex,
      birthday: user.birthday || "",
      address: user.address,
      position: user.position || "",
      department: user.department,
      email: user.email || "",
      password: "", // We typically don't pre-fill passwords
    });

    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  // Handle delete button click
  const handleDeleteClick = (user: User) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };

  // Handle update user form submission
  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) return;

    // Create updated user data
    const updatedUser: User = {
      ...currentUser,
      name: `${editUserForm.firstName} ${editUserForm.lastName}`,
      sex: editUserForm.gender,
      age: calculateAgeFromBirthday(editUserForm.birthday),
      department: editUserForm.department,
      address: editUserForm.address,
      position: editUserForm.position,
      email: editUserForm.email,
      birthday: editUserForm.birthday,
    };

    // Update the users array
    setUsers(
      users.map((user) => (user.id === currentUser.id ? updatedUser : user))
    );

    // Close modal and reset state
    setIsEditModalOpen(false);
    setCurrentUser(null);
  };

  // Handle user deletion
  const handleDeleteUser = () => {
    if (!currentUser) return;

    // Remove user from the array
    setUsers(users.filter((user) => user.id !== currentUser.id));

    // Close modal and reset state
    setIsDeleteModalOpen(false);
    setCurrentUser(null);
  };

  // Calculate age from birthday
  const calculateAgeFromBirthday = (birthday: string): number => {
    if (!birthday) return 0;

    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Get unapproved users for the approval modal
  const unapprovedUsers = users.filter((user) => !user.isApproved);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Title and Subtitle */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Management</h1>
        <p className="text-sm text-gray-600">Manages users information</p>
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        {/* Left Section: Approve and New Profile Buttons */}
        <div className="flex items-center space-x-4">
          {/* Approve Button - Now opens the approval modal */}
          <button
            type="button"
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
            onClick={() => setIsApprovalModalOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Approve
          </button>

          {/* New Profile Button - Now opens the create modal */}
          <button
            type="button"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Profile
          </button>
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex items-center w-1/3">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              const searchValue = e.target.value.toLowerCase();
              console.log(searchValue);
            }}
          />
        </div>

        {/* Right Section: Export and Filter Buttons */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
                setIsFilterActive(false);
              }}
              className="flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg shadow-md hover:bg-blue-200"
            >
              <FaShareSquare className="mr-2" /> {/* Export Icon */}
              Export
            </button>

            {/* Export Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-40 z-10">
                <ul className="py-2">
                  <li
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-orange-500 transition-colors"
                    onClick={() => console.log("Export to Excel")}
                  >
                    <img
                      src="/excel.png"
                      alt="Excel Icon"
                      className="w-5 h-5 mr-2"
                    />
                    Export to Excel
                  </li>
                  <li
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-orange-500 transition-colors"
                    onClick={() => console.log("Export to PDF")}
                  >
                    <img
                      src="/pdf.png"
                      alt="PDF Icon"
                      className="w-5 h-5 mr-2"
                    />
                    Export to PDF
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => {
                setIsFilterActive(!isFilterActive);
                setIsDropdownOpen(false);
              }}
              className={`flex items-center px-4 py-2 rounded-lg shadow-md ${
                isFilterActive
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white" // Default state
              }`}
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filter
            </button>

            {/* Filter Dropdown Menu */}
            {isFilterActive && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-64 z-10">
                <div className="p-4">
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      Position
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Intern", "TL", "Junior", "STL"].map((position) => (
                        <button
                          key={position}
                          onClick={() => {
                            if (appliedFilters.includes(position)) {
                              setAppliedFilters(
                                appliedFilters.filter(
                                  (filter) => filter !== position
                                )
                              );
                            } else {
                              setAppliedFilters([...appliedFilters, position]);
                            }
                          }}
                          className={`px-3 py-1 rounded-full text-sm shadow-md ${
                            appliedFilters.includes(position)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white"
                          }`}
                        >
                          {position}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Department Filter */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      Department
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Dev team",
                        "HR",
                        "Data Analyst",
                        "Quality assurance",
                      ].map((department) => (
                        <button
                          key={department}
                          onClick={() => {
                            if (appliedFilters.includes(department)) {
                              setAppliedFilters(
                                appliedFilters.filter(
                                  (filter) => filter !== department
                                )
                              );
                            } else {
                              setAppliedFilters([
                                ...appliedFilters,
                                department,
                              ]);
                            }
                          }}
                          className={`px-3 py-1 rounded-full text-sm shadow-md ${
                            appliedFilters.includes(department)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white"
                          }`}
                        >
                          {department}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Age Filter */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      Age
                    </p>
                    <input
                      type="number"
                      placeholder="Enter Age"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (value >= 1 || e.target.value === "") {
                          const age = `Age: ${value}`;
                          if (e.target.value) {
                            if (!appliedFilters.includes(age)) {
                              setAppliedFilters([...appliedFilters, age]);
                            }
                          } else {
                            setAppliedFilters(
                              appliedFilters.filter(
                                (filter) => !filter.startsWith("Age:")
                              )
                            );
                          }
                        }
                      }}
                    />
                  </div>

                  {/* Reset and Apply Buttons */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => setAppliedFilters([])}
                      className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow-md hover:bg-gray-200"
                    >
                      Reset All
                    </button>
                    <button
                      onClick={() => setIsFilterActive(false)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                    >
                      Apply now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Applied Filters Section */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Filters:</p>
        <div className="flex flex-wrap gap-2">
          {appliedFilters.map((filter, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm shadow-md flex items-center"
            >
              {filter}
              <button
                onClick={() =>
                  setAppliedFilters(
                    appliedFilters.filter((_, i) => i !== index)
                  )
                }
                className="ml-2 text-red-500 hover:text-red-600"
                title="Remove filter"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Table Section - Fixed structure and maximized space */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg table-fixed">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-800">
                <th className="px-1 py-2 w-8">
                  <input
                    type="checkbox"
                    title="Select all users"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="ml-1"
                  />
                </th>
                <th className="px-2 py-2 w-1/4">Name</th>
                <th className="px-2 py-2 w-12">Sex</th>
                <th className="px-2 py-2 w-10">Age</th>
                <th className="px-2 py-2 w-16">Position</th>
                <th className="px-2 py-2 w-20">Department</th>
                <th className="px-2 py-2 w-1/3">Address</th>
                <th className="px-1 py-2 w-16 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-1 py-2">
                    <input
                      type="checkbox"
                      title="Select user"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="ml-1"
                    />
                  </td>
                  <td className="px-2 py-2 truncate">{user.name}</td>
                  <td className="px-2 py-2">{user.sex}</td>
                  <td className="px-2 py-2">{user.age}</td>
                  <td className="px-2 py-2">
                    {user.position ? user.position : "Intern"}
                  </td>
                  <td className="px-2 py-2">{user.department}</td>
                  <td className="px-2 py-2 truncate">{user.address}</td>
                  <td className="px-1 py-2">
                    <div className="flex justify-center space-x-3">
                      <button
                        type="button"
                        title="Delete"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteClick(user)}
                      >
                        <FaTrash />
                      </button>
                      <button
                        type="button"
                        title="Edit"
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => handleEditClick(user)}
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-4">
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
        <div className="flex space-x-2">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg shadow-md ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
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

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Create User</h2>

              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="bg-blue-500 rounded-xl w-12 h-12 flex items-center justify-center focus:outline-none hover:bg-blue-600 transition-colors shadow-md"
                aria-label="Go back"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleCreateUser}>
                <div className="space-y-4">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Enter First Name"
                      value={newUserForm.firstName}
                      onChange={handleFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Enter Last Name"
                      value={newUserForm.lastName}
                      onChange={handleFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Gender
                    </label>
                    <input
                      type="text"
                      id="gender"
                      name="gender"
                      placeholder="Enter Gender"
                      value={newUserForm.gender}
                      onChange={handleFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Birthday */}
                  <div>
                    <label
                      htmlFor="birthday"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Birthday
                    </label>
                    <input
                      type="date"
                      id="birthday"
                      name="birthday"
                      placeholder="Enter Birthday"
                      value={newUserForm.birthday}
                      onChange={handleFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Enter Address"
                      value={newUserForm.address}
                      onChange={handleFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label
                      htmlFor="position"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Position
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      placeholder="Enter Position"
                      value={newUserForm.position}
                      onChange={handleFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      placeholder="Enter Department"
                      value={newUserForm.department}
                      onChange={handleFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      value={newUserForm.email}
                      onChange={handleFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      value={newUserForm.password}
                      onChange={handleFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Create profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Edit User</h2>

              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="bg-blue-500 rounded-xl w-12 h-12 flex items-center justify-center focus:outline-none hover:bg-blue-600 transition-colors shadow-md"
                aria-label="Go back"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleUpdateUser}>
                <div className="space-y-4">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="editFirstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="editFirstName"
                      name="firstName"
                      placeholder="Enter First Name"
                      value={editUserForm.firstName}
                      onChange={handleEditFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="editLastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="editLastName"
                      name="lastName"
                      placeholder="Enter Last Name"
                      value={editUserForm.lastName}
                      onChange={handleEditFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label
                      htmlFor="editGender"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Gender
                    </label>
                    <input
                      type="text"
                      id="editGender"
                      name="gender"
                      placeholder="Enter Gender"
                      value={editUserForm.gender}
                      onChange={handleEditFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Birthday */}
                  <div>
                    <label
                      htmlFor="editBirthday"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Birthday
                    </label>
                    <input
                      type="date"
                      id="editBirthday"
                      name="birthday"
                      placeholder="Enter Birthday"
                      value={editUserForm.birthday}
                      onChange={handleEditFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="editAddress"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="editAddress"
                      name="address"
                      placeholder="Enter Address"
                      value={editUserForm.address}
                      onChange={handleEditFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label
                      htmlFor="editPosition"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Position
                    </label>
                    <input
                      type="text"
                      id="editPosition"
                      name="position"
                      placeholder="Enter Position"
                      value={editUserForm.position}
                      onChange={handleEditFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label
                      htmlFor="editDepartment"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      id="editDepartment"
                      name="department"
                      placeholder="Enter Department"
                      value={editUserForm.department}
                      onChange={handleEditFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="editEmail"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="editEmail"
                      name="email"
                      placeholder="Enter Email"
                      value={editUserForm.email}
                      onChange={handleEditFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Update profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <FaTrash className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Delete User
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this profile? This action cannot
                be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Approval Modal */}
      {isApprovalModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">User Approval</h2>

              <button
                type="button"
                onClick={() => setIsApprovalModalOpen(false)}
                className="bg-blue-500 rounded-xl w-12 h-12 flex items-center justify-center focus:outline-none hover:bg-blue-600 transition-colors shadow-md"
                aria-label="Go back"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4">
              {/* User approval content */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">User Approval</h3>
                <div className="flex items-center">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
                    onClick={() => {
                      unapprovedUsers.forEach((user) => {
                        handleApproveUser(user.id);
                      });

                      setIsApprovalModalOpen(false);
                    }}
                  >
                    Approve All
                  </button>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {unapprovedUsers.length} pending
                  </span>
                </div>
              </div>

              {/* User list */}
              <div className="bg-gray-50 rounded-lg">
                {unapprovedUsers.length > 0 ? (
                  unapprovedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="border-b border-gray-200 p-4 hover:bg-gray-100"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {user.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Email: {user.email || `user${user.id}@example.com`}
                          </p>
                          <div className="flex mt-2">
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full mr-2">
                              {user.position || "Intern"}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                              {user.department}
                            </span>
                          </div>
                        </div>
                        <div className="flex">
                          <button
                            className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 mr-2"
                            onClick={() => handleApproveUser(user.id)}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 mr-2"
                            onClick={() => handleDeclineUser(user.id)}
                          >
                            Decline
                          </button>
                          {/* Toggle details button */}
                          <button
                            className="text-blue-500 hover:text-blue-700 px-2"
                            onClick={() => toggleUserDetails(user.id)}
                            title={
                              expandedUsers.includes(user.id)
                                ? "Hide details"
                                : "Show details"
                            }
                          >
                            {expandedUsers.includes(user.id) ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="mt-2 text-sm text-gray-500">
                        <p>Location: {user.address}</p>
                      </div>

                      {/* Expanded user details section */}
                      {expandedUsers.includes(user.id) && (
                        <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-3">
                            Additional Details
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm">
                                <span className="font-medium text-gray-700">
                                  Birthday:
                                </span>{" "}
                                {user.birthday || "Not specified"}
                              </p>
                              <p className="text-sm mt-2">
                                <span className="font-medium text-gray-700">
                                  Gender:
                                </span>{" "}
                                {user.sex}
                              </p>
                              <p className="text-sm mt-2">
                                <span className="font-medium text-gray-700">
                                  Age:
                                </span>{" "}
                                {user.age}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm">
                                <span className="font-medium text-gray-700">
                                  Department:
                                </span>{" "}
                                {user.department}
                              </p>
                              <p className="text-sm mt-2">
                                <span className="font-medium text-gray-700">
                                  Position:
                                </span>{" "}
                                {user.position || "Intern"}
                              </p>
                              <p className="text-sm mt-2">
                                <span className="font-medium text-gray-700">
                                  Email:
                                </span>{" "}
                                {user.email || `user${user.id}@example.com`}
                              </p>
                            </div>
                            <div className="col-span-1 md:col-span-2">
                              <p className="text-sm">
                                <span className="font-medium text-gray-700">
                                  Full Address:
                                </span>{" "}
                                {user.address}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">No pending users to approve</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
