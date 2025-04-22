"use client"; // Ensure this is a client component

import React from "react";
import Header from "../Components/header";
import Sidebar from "../Components/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
