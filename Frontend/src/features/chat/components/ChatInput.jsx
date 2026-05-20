import React, { useState } from "react";
import { PaperclipIcon, ArrowUpIcon } from "../components/Icons";
import { useChat } from "../hooks/useChat";

const ChatInput = ({ currentChatId }) => {
  const [inputValue, setInputValue] = useState("");

  const { handleSendChatMessage } = useChat();

  console.log("currentChatId inside ChatInput:", currentChatId);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    handleSendChatMessage({
      message: inputValue,
      chatId: currentChatId,
    });
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="border border-[#191918]/10 rounded-lg bg-[#FAF9ED] p-3 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
      <span className="text-[#191918]/50 cursor-pointer flex">
        <PaperclipIcon />
      </span>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What should we explore today..."
        className={`flex-1 border-none outline-none bg-transparent font-sans text-[0.95rem] text-[#191918] ${inputValue ? "not-italic" : "italic"}`}
      />
      <button
        onClick={handleSend}
        className="bg-[#FCAA2D] text-[#191918] w-8 h-8 rounded flex items-center justify-center transition-opacity duration-200 border-none cursor-pointer hover:opacity-80"
      >
        <ArrowUpIcon />
      </button>
    </div>
  );
};

export default ChatInput;
