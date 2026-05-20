import React, { useState, useEffect } from "react";

import {
  HomeIcon,
  MessageSquareIcon,
  MicroscopeIcon,
  MailIcon,
  LayersIcon,
  ListTreeIcon,
  SettingsIcon,
  HelpCircleIcon,
  UserIcon,
  ScrollIcon,
  PaperclipIcon,
  ArrowUpIcon,
  MoreHorizontalIcon,
} from "../components/Icons";
import { useSelector, useDispatch } from "react-redux";
import { useChat } from "../hooks/useChat";
import { setCurrentChatId } from "../chat.slice";
import { current } from "@reduxjs/toolkit";
import ChatInput from "../components/ChatInput";
import ChatSidebar from "../components/ChatSidebar";

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

const ThreadItem = ({ thread, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`px-6 py-4 border-b border-[#191918]/10 cursor-pointer transition-colors duration-200 
        ${isActive ? "bg-[#FCAA2D]/5" : "hover:bg-[#191918]/5 bg-transparent"}`}
    >
      <div
        className={`font-sans text-[0.82rem] mb-1 text-[#191918] ${isActive ? "font-medium" : "font-normal"}`}
      >
        {thread.title}
      </div>
      <div className="font-mono text-[0.6rem] text-[#191918]/50 uppercase">
        {thread.meta}
      </div>
    </div>
  );
};

const ChatPage = ({ activeNav, setActiveNav, onNavigateHome }) => {
  const dispatch = useDispatch();

  const { handleGetChats, handleOpenChat } = useChat();

  const allChats = useSelector((state) => state.chat.chats);
  let currentChatId = useSelector((state) => state.chat.currentChatId);

  console.log("currentChatId in the ChatPage", currentChatId);

  useEffect(() => {
    handleGetChats();
    if (currentChatId) {
      handleOpenChat(currentChatId);
    }
  }, []);

  const openChat = (chatId) => {
    dispatch(setCurrentChatId(chatId));
    handleOpenChat(chatId);
  };

  const handleAddNewChat = () => {
    console.log("handle add new chat ran");
    dispatch(setCurrentChatId(null));
  };
  return (
    <div className="flex h-screen w-full font-sans antialiased text-[#191918] bg-[#FFFEF2] relative">
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Global Nav (Thin minimal sidebar) */}
      <nav className="w-16 bg-[#F9F8E8] border-r border-[#191918]/10 flex flex-col items-center py-6 gap-8 shrink-0 relative z-10 overflow-y-auto overflow-x-hidden">
        <div className="mb-4">
          <div
            onClick={onNavigateHome}
            className="w-8 h-8 rounded bg-[#191918] flex items-center justify-center text-white font-bold text-lg font-sans cursor-pointer transition-opacity hover:opacity-80"
          >
            I
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <NavIcon
            active={activeNav === "home"}
            onClick={() => setActiveNav("home")}
          >
            <HomeIcon />
          </NavIcon>
          <NavIcon
            active={activeNav === "chat"}
            onClick={() => setActiveNav("chat")}
          >
            <MessageSquareIcon />
          </NavIcon>
          <NavIcon
            active={activeNav === "research"}
            onClick={() => setActiveNav("research")}
          >
            <MicroscopeIcon />
          </NavIcon>
          <NavIcon
            active={activeNav === "emails"}
            onClick={() => setActiveNav("emails")}
          >
            <MailIcon />
          </NavIcon>
          <NavIcon
            active={activeNav === "sources"}
            onClick={() => setActiveNav("sources")}
          >
            <LayersIcon />
          </NavIcon>
          <NavIcon
            active={activeNav === "threads"}
            onClick={() => setActiveNav("threads")}
          >
            <ListTreeIcon />
          </NavIcon>
        </div>
        <div className="mt-auto flex flex-col gap-6 mb-6">
          <NavIcon
            active={activeNav === "settings"}
            onClick={() => setActiveNav("settings")}
          >
            <SettingsIcon />
          </NavIcon>
          <NavIcon
            active={activeNav === "support"}
            onClick={() => setActiveNav("support")}
          >
            <HelpCircleIcon />
          </NavIcon>
        </div>
        <div className="">
          <div className="w-8 h-8 rounded-full bg-[#191918]/10 border border-[#191918]/10 flex items-center justify-center font-mono text-[0.6rem] text-[#191918]">
            AD
          </div>
        </div>
      </nav>

      {/* Threads Panel (Secondary adjacent sidebar) */}

      <ChatSidebar
        allChats={allChats}
        openChat={openChat}
        handleAddNewChat={handleAddNewChat}
      />

      {/* Chat Main */}

      <main className="flex-1 flex flex-col bg-[#FFFEF2] relative z-10">
        <header className="h-16 border-b border-[#191918]/10 flex items-center px-10 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 bg-[#FCAA2D] rounded-full" />
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-[#191918]">
              {currentChatId
                ? `Repository: ${allChats[currentChatId]?.title}`
                : `Exploration`}
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-[15%] pt-16 pb-8">
          {!currentChatId ? (
            <div className="flex flex-col gap-6">
              <h3 className="text-center">Welcome to Inkpot Chat</h3>
              <ChatInput currentChatId={currentChatId} />
            </div>
          ) : (
            allChats[currentChatId]?.messages?.map((msg) => {
              // msg is an object
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg._id}
                  className={`mb-6 w-full flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[700px] ${!isUser ? "border-l-2 border-[#FCAA2D] pl-6" : ""}`}
                  >
                    <div
                      className={`font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#191918]/40 mb-2 ${isUser ? "text-right" : "text-left"}`}
                    >
                      <span>{isUser ? "HUMAN" : "INKPOT"}</span>
                    </div>
                    <div
                      className={`leading-[1.8] ${isUser ? "text-sm text-[#191918]/50 italic text-right bg-[#f2f0de] px-3 py-2 rounded-md" : "text-sm text-[#191918]/80  px-3 py-2 font-light text-left"}`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {currentChatId && (
          <div className="px-[15%] pb-8 pt-8 bg-gradient-to-t from-[#FFFEF2] from-80% to-transparent">
            {/* chat Input */}
            <ChatInput currentChatId={currentChatId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatPage;
