import React from "react";

const page = () => {
  return (
    <div>
      {/* Main Section */}
      <main className="relative flex flex-col md:flex-row items-start justify-between w-full max-w-7xl px-8 py-16">
        {/* Create New Password Form */}
        <div className="z-10 bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center border border-gray-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create new Password
          </h2>
          <p className="text-gray-600 mb-4 flex items-center justify-center">
            Create a secure password{" "}
            <img src="/password.png" alt="Key Icon" className="h-7 ml-2" />
          </p>
          <p className="text-gray-600 mb-6">
            This password must be different from your previous password and must
            contain at least 8 characters.
          </p>
          <form>
            <input
              type="password"
              placeholder="New password"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700"
            >
              Back
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default page;
