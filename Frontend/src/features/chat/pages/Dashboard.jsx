import React, { useEffect } from "react";

import { useChat } from "../hooks/useChat";

import Sidebar from "../components/Sidebar";
import { Outlet, useLocation } from "react-router";

const Dashboard = () => {
  const chat = useChat();

  useEffect(() => {
    chat.initialiseSocketConnection();
  }, []);

  const location = useLocation();

  return (
    <div className="flex bg-[#FFFEF2] text-[#191918] font-sans h-screen overflow-hidden relative">
      {location.pathname !== "/chat" && <Sidebar />}
      <Outlet />
    </div>
  );
};

export default Dashboard;
