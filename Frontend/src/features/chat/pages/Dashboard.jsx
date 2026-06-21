import React, { useEffect, useState } from "react";

import { useChat } from "../hooks/useChat";

import Sidebar from "../components/Sidebar";
import MobileDrawer from "../components/MobileDrawer";
import { MenuIcon } from "../components/Icons";
import { Outlet, useLocation } from "react-router";

const Dashboard = () => {
  const chat = useChat();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    chat.initialiseSocketConnection();
  }, []);

  const location = useLocation();
  const showSidebar = location.pathname !== "/chat";

  // Close the drawer whenever the route changes (e.g. tapping a nav item)
  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col md:flex-row bg-[#FFFEF2] text-[#191918] font-sans h-screen overflow-hidden relative">
      {showSidebar && (
        <>
          {/* Mobile top bar — the only place the hamburger lives on small screens */}
          <div className="md:hidden flex items-center gap-3 h-14 px-4 border-b border-[#191918]/10 shrink-0">
            <button
              onClick={() => setNavOpen(true)}
              aria-label="Open navigation"
              className="text-[#191918] cursor-pointer flex"
            >
              <MenuIcon />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#FCAA2D] rounded" />
              <span className="font-semibold tracking-tight">Inkpot</span>
            </div>
          </div>

          <MobileDrawer open={navOpen} onClose={() => setNavOpen(false)}>
            <Sidebar />
          </MobileDrawer>
        </>
      )}
      <Outlet />
    </div>
  );
};

export default Dashboard;
