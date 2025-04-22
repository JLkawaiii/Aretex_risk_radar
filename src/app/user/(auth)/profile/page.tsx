"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdatingPicture, setIsUpdatingPicture] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Password modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);

    if (isUpdatingPicture) setIsUpdatingPicture(false);
  };

  const togglePictureUpdate = () => {
    setIsUpdatingPicture(!isUpdatingPicture);

    if (isEditing) setIsEditing(false);
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // handle the file upload
      console.log("File selected:", file);

      setIsUpdatingPicture(false);
    }
  };

  const togglePasswordModal = () => {
    setIsPasswordModalOpen(!isPasswordModalOpen);

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
    setPasswordSuccess(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
    // Clear error message when user starts typing
    if (passwordError) setPasswordError("");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords
    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setPasswordError("All fields are required");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setPasswordError("");

    // Simulate API call
    setTimeout(() => {
      console.log("Password updated:", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordSuccess(true);

      setTimeout(() => {
        setIsPasswordModalOpen(false);
        setPasswordSuccess(false);
      }, 1500);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* Profile Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <p className="text-sm text-gray-500">
          Personalize your profile details
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-8 relative">
          <div className="relative h-24 w-24 mb-4">
            <Image
              src="/profile.jpg"
              alt="Profile Avatar"
              className="rounded-full border-2 border-orange-500"
              width={96}
              height={96}
            />

            <button
              onClick={togglePictureUpdate}
              className="absolute -bottom-2 -right-2 bg-orange-500 rounded-full p-2 shadow-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
              aria-label="Update profile picture"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-2.5 w-2.5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-10 10a2 2 0 01-1.414.586H4a1 1 0 01-1-1v-1a2 2 0 01.586-1.414l10-10z" />
              </svg>
            </button>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* Profile Name - Now positioned before the picture update UI */}
          <h2 className="text-xl font-bold text-gray-800">
            John Lloyd S. Brillante
          </h2>
          <p className="text-sm text-gray-600">Dev Team Full Stack Developer</p>

          {/* Picture Update UI - Now placed below the name */}
          {isUpdatingPicture && (
            <div className="mt-4 flex flex-col items-center">
              <p className="text-sm text-orange-500 font-medium mb-2">
                Update your profile picture
              </p>
              <button
                onClick={handleFileSelect}
                className="px-2 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                Choose File
              </button>
            </div>
          )}

          {/* Edit Profile Button - For editing all details */}
          <button
            onClick={toggleEditing}
            className="absolute top-40 right-0 flex items-center gap-1 px-3 py-1 text-xs border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-blue-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-10 10a2 2 0 01-1.414.586H4a1 1 0 01-1-1v-1a2 2 0 01.586-1.414l10-10z" />
            </svg>
            Edit
          </button>

          {/* Edit Status Indicator */}
          {isEditing && (
            <p className="mt-2 text-sm text-orange-500 font-medium">
              You can now update your profile
            </p>
          )}
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 top-48 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded">
            <label className="block text-xs text-gray-500 mb-2">Birthday</label>
            <div className="text-gray-700">
              {isEditing ? (
                <input
                  className="w-full p-2 border rounded"
                  defaultValue="12/14/2022"
                />
              ) : (
                "12/14/2022"
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <label className="block text-xs text-gray-500 mb-2">Gender</label>
            <div className="text-gray-700">
              {isEditing ? (
                <input
                  className="w-full p-2 border rounded"
                  defaultValue="Male"
                />
              ) : (
                "Male"
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <label className="block text-xs text-gray-500 mb-2">Address</label>
            <div className="text-gray-700">
              {isEditing ? (
                <input
                  className="w-full p-2 border rounded"
                  defaultValue="Pasig City"
                />
              ) : (
                "Pasig City"
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <label className="block text-xs text-gray-500 mb-2">
              Department
            </label>
            <div className="text-gray-700">
              {isEditing ? (
                <input
                  className="w-full p-2 border rounded"
                  defaultValue="Dev Team"
                />
              ) : (
                "Dev Team"
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <label className="block text-xs text-gray-500 mb-2">Position</label>
            <div className="text-gray-700">
              {isEditing ? (
                <input
                  className="w-full p-2 border rounded"
                  defaultValue="Intern"
                />
              ) : (
                "Intern"
              )}
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-700 mb-2">
            My email Address
          </p>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700">johnlloyd.brillante@aretex.com.au</p>
          </div>
        </div>

        {/* Password Section */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Password Setting
          </p>
          <button
            onClick={togglePasswordModal}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            Change Password
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          {isEditing && (
            <button
              onClick={toggleEditing}
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              Save Changes
            </button>
          )}

          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">
                Change Password
              </h3>
              <button
                type="button"
                onClick={togglePasswordModal}
                className="bg-blue-500 rounded-lg w-10 h-10 flex items-center justify-center focus:outline-none hover:bg-blue-600 transition-colors"
                aria-label="Close modal"
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
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="p-6">
              <div className="space-y-4">
                {/* Current Password */}
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter your current password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                {/* New Password */}
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                {/* Confirm New Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                {/* Error Message */}
                {passwordError && (
                  <div className="text-red-500 text-sm">{passwordError}</div>
                )}

                {passwordSuccess && (
                  <div className="text-green-500 text-sm">
                    Password changed successfully!
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={togglePasswordModal}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:opacity-50"
                    disabled={passwordSuccess}
                  >
                    Save Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
