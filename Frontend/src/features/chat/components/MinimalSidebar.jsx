import React from "react";
import { useNavigate } from "react-router";
import {
  HomeIcon,
  MessageSquareIcon,
  MicroscopeIcon,
  MailIcon,
  LayersIcon,
  ListTreeIcon,
  SettingsIcon,
  HelpCircleIcon,
} from "../components/Icons";

const NavIcon = ({ children, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`transition-colors duration-200 cursor-pointer ${active ? "text-[#191918]" : "text-[#191918]/50 hover:text-[#191918]"}`}
    >
      {children}
    </div>
  );
};

const MinimalSidebar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-16 bg-[#F9F8E8] border-r border-[#191918]/10 flex flex-col items-center py-6 gap-8 shrink-0 relative z-10 overflow-y-auto overflow-x-hidden">
      <div className="mb-4">
        <div
          onClick={() => navigate("/")}
          className="w-8 h-8 rounded bg-[#191918] flex items-center justify-center text-white font-bold text-lg font-sans cursor-pointer transition-opacity hover:opacity-80"
        >
          I
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <NavIcon onClick={() => navigate("/")}>
          <HomeIcon />
        </NavIcon>
        <NavIcon onClick={() => navigate("/chat")}>
          <MessageSquareIcon />
        </NavIcon>
        <NavIcon onClick={() => navigate("/research")}>
          <MicroscopeIcon />
        </NavIcon>
        <NavIcon onClick={() => navigate("/email")}>
          <MailIcon />
        </NavIcon>
        <NavIcon onClick={() => navigate("/sources")}>
          <LayersIcon />
        </NavIcon>
        <NavIcon onClick={() => navigate("/threads")}>
          <ListTreeIcon />
        </NavIcon>
      </div>
      <div className="mt-auto flex flex-col gap-6 mb-6">
        <NavIcon onClick={() => navigate("/settings")}>
          <SettingsIcon />
        </NavIcon>
        <NavIcon onClick={() => navigate("/support")}>
          <HelpCircleIcon />
        </NavIcon>
      </div>
      <div className="">
        <div className="w-8 h-8 rounded-full bg-[#191918]/10 border border-[#191918]/10 flex items-center justify-center font-mono text-[0.6rem] text-[#191918]">
          AD
        </div>
      </div>
    </nav>
  );
};

export default MinimalSidebar;
