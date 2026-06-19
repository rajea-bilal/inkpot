import React, { useState } from "react";

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

const ChatSidebar = ({ allChats, openChat, handleAddNewChat }) => {
  const [activeThread, setActiveThread] = useState(1);

  console.log("allChats inside ChatSidebar:", allChats);
  return (
    <aside className="w-70 bg-[#FFFEF2] border-r border-[#191918]/10 flex flex-col shrink-0 relative z-10">
      <div className="p-6 border-b border-[#191918]/10">
        <div className="font-mono text-[0.65rem] uppercase tracking-widest text-[#191918]/50 mb-1">
          Conversations
        </div>
        <div className="font-sans font-medium text-sm text-[#191918]">
          Threads
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {Object.values(allChats)?.map((thread) => (
          <ThreadItem
            key={thread._id}
            thread={thread}
            isActive={activeThread === thread._id}
            onClick={() => openChat(thread._id)}
          />
        ))}
      </div>
      <div className="p-4 border-t border-[#191918]/10">
        <button
          onClick={() => handleAddNewChat()}
          className="w-full py-2 border border-[#191918]/10 rounded font-mono text-[0.65rem] uppercase tracking-widest bg-transparent hover:bg-yellow-400 transition-colors duration-200 cursor-pointer text-[#191918] "
        >
          + New Chat
        </button>
      </div>
    </aside>
  );
};

export default ChatSidebar;
