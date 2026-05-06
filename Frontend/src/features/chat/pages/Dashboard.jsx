import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

import Sidebar from "../components/Sidebar";
import HomePage from "./HomePage";
import ChatPage from "./ChatPage";
import PlaceholderPage from "../components/PlaceholderPage";

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState('home');
  const chat = useChat();

  useEffect(() => {
    chat.initialiseSocketConnection();
  }, []);

  const { user } = useSelector((state) => state.auth);

  const renderContent = () => {
    switch (activeNav) {
      case 'home': return <HomePage />;
      case 'chat': return <ChatPage activeNav={activeNav} setActiveNav={setActiveNav} onNavigateHome={() => setActiveNav('home')} />;
      case 'research': return <PlaceholderPage title="Research" />;
      case 'emails': return <PlaceholderPage title="Emails" />;
      case 'sources': return <PlaceholderPage title="Sources" />;
      case 'threads': return <PlaceholderPage title="Threads" />;
      case 'settings': return <PlaceholderPage title="Settings" />;
      case 'support': return <PlaceholderPage title="Support" />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="flex bg-[#FFFEF2] text-[#191918] font-sans h-screen overflow-hidden relative">
      {activeNav !== 'chat' && <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />}
      {renderContent()}
    </div>
  );
};

export default Dashboard;
