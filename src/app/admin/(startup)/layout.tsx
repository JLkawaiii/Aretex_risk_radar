"use client";

import React, { ReactNode } from "react";
import StartupHeader from "../Components/startupheader";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <StartupHeader>{children}</StartupHeader>;
};

export default Layout;
