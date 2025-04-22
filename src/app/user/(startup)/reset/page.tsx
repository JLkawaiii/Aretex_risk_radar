import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div>
      {/* Main Section */}
      <main className="relative flex flex-col md:flex-row items-start justify-between w-full max-w-7xl px-8 py-16">
        {/* Forgot Password Message */}
        <div className="z-10 bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center border border-gray-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-600 mb-4 flex items-center justify-center">
            No worries we’ll send you reset instructions{" "}
            <img src="/key.jpg" alt="Key Icon" className="h-5 ml-2" />
          </p>
          <p className="text-gray-600 mb-6">
            Enter the email address of your account and we’ll send confirmation
            to reset your password.
          </p>
          <form>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Link
              href={"/admin/signin"}
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 block"
            >
              Back
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
};

export default page;
