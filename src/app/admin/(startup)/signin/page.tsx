"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    // Add your authentication logic here
  };

  return (
    <div className="relative flex flex-col md:flex-row items-start justify-start w-full max-w-7xl px-8 py-16 -mt-0">
      {/* Login Form - Positioned on left side */}
      <div className="z-10 bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Hi there!</h2>
        <p className="text-gray-600 text-sm mb-6">
          Enter your credentials to access your account
        </p>

        {/* Google Sign In Button */}
        <button className="w-full flex items-center justify-center px-4 py-2.5 bg-gray-100 text-gray-800 font-medium rounded-lg shadow-sm hover:bg-gray-200 mb-6">
          <FcGoogle className="text-xl mr-2" />
          Sign in with Google
        </button>

        {/* Divider */}
        <div className="flex items-center w-full mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2.5 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2.5 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex justify-end mb-6">
            <Link
              href="/admin/forgot-password"
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 mb-4"
          >
            Log in
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/admin/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
