"use client";
import React from "react";

const Page = () => {
  return (
    <div>
      {/* Main Section */}
      <main className="relative flex flex-col md:flex-row items-start justify-between w-full max-w-7xl px-8 py-16">
        <div className="z-10 bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Verification
          </h2>
          <p className="text-gray-600 mb-6 flex items-center justify-center">
            Please verify your gmail{" "}
            <img src="/gmail.png" alt="Gmail Icon" className="h-5 ml-2" />
          </p>
          <p className="text-gray-600 mb-6">
            Check your inbox for a message from{" "}
            <strong>aretex Risk Radar</strong> and click the confirmation link.
          </p>
          <button
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>
      </main>
    </div>
  );
};

export default Page;
