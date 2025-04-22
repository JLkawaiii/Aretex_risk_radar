"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });

    router.push("/admin/dashboard");
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
        <button
          type="button"
          className="w-full flex items-center justify-center px-4 py-2.5 bg-gray-100 text-gray-800 font-medium rounded-lg shadow-sm hover:bg-gray-200 mb-6"
        >
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
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-600"
              >
                Remember me
              </label>
            </div>
            <div>
              <Link
                href="/admin/reset"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
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
          <Link href="/user/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
