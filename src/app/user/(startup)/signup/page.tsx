"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", {
      firstName,
      lastName,
      gender,
      birthday,
      department,
      position,
      address,
      email,
      password,
      agreeToTerms,
    });
    router.push("/admin/dashboard");
  };

  return (
    <div>
      {/* Main Section */}
      <main className="relative flex flex-col md:flex-row items-start justify-start w-full max-w-7xl px-8 py-16 -mt-0">
        {/* Signup Form */}
        <div className="z-10 bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Create an account
          </h2>
          <p className="text-gray-600 mb-4">
            Already have an account?{" "}
            <Link href="/user/signin" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-4 mb-4">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-4 mb-4">
              <input
                type="text"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                placeholder="Birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-4 mb-4">
              <input
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="terms" className="text-gray-600 text-sm">
                I agree to the{" "}
                <Link
                  href="/user/terms"
                  className="text-blue-600 hover:underline"
                >
                  Terms & Conditions
                </Link>
              </label>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 mb-4"
            >
              Create account
            </button>
          </form>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-200">
            <img src="/google.png" alt="Google Icon" className="h-5 mr-2" />
            Log in with Google
          </button>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
