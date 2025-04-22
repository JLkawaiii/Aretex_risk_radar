"use client";

import React, { useState } from "react";
import Link from "next/link";

const Page = () => {
  // Add state to manually track hover for fallback
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center overflow-hidden font-sans">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-8 py-4 bg-gray-100 shadow-md h-16">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <img
            src="/riskradar.png"
            alt="Risk Radar Logo"
            className="h-11 mr-1"
          />
          <div className="flex items-center space-x-1">
            <img src="/aretex.png" alt="Aretex" className="h-5" />
            <span className="text-xl h-6 font-bold text-red-500">RISK</span>
            <span className="text-xl h-6 font-bold text-gray-800">RADAR</span>
          </div>
        </div>

        {/* Navigation Links - Updated with better hover effects */}
        <nav className="flex items-center space-x-6 z-10">
          <Link
            href="/user/about"
            className={`text-gray-600 hover:text-orange-500 relative px-2 py-1 transition-colors duration-200 ${
              isAboutHovered ? "text-orange-500" : ""
            }`}
            onMouseEnter={() => setIsAboutHovered(true)}
            onMouseLeave={() => setIsAboutHovered(false)}
          >
            About
            <span
              className="absolute left-0 right-0 bottom-0 h-0.5 bg-orange-500 transform origin-left transition-transform duration-200"
              style={{
                transform: isAboutHovered ? "scaleX(1)" : "scaleX(0)",
              }}
            ></span>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-8 py-16">
        {/* Text Content */}
        <div className="max-w-lg text-center md:text-left z-10">
          <h1 className="text-6xl md:text-5xl font-bold text-gray-800 leading-tight">
            Stay ahead of potential threats with{" "}
            <span className="inline-block align-middle relative -translate-y-2">
              <img
                src="/aretex.png"
                alt="Aretex Logo"
                className="h-9 inline-block align-middle"
              />
            </span>{" "}
            <span className="text-red-500">Risk</span>{" "}
            <span className="text-gray-800">Radar</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Making Aretex family safe by Predicting and Mapping High-Risk Areas
            Using Spatiotemporal Data Trends
          </p>
          <Link
            href="/user/signin"
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 inline-block"
          >
            Get started
          </Link>
        </div>

        {/* Radar Image */}
        <div className="absolute w-[1500px] h-[1150px] -right-96 -top-20">
          <img
            src="/radar.png"
            alt="Radar"
            className="w-full h-full object-contain"
          />
        </div>
      </main>
    </div>
  );
};

export default Page;
