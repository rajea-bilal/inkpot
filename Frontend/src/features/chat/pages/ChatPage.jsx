import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSelector, useDispatch } from "react-redux";
import { useChat } from "../hooks/useChat";
import { setCurrentChatId } from "../chat.slice";

import ChatInput from "../components/ChatInput";
import ChatSidebar from "../components/ChatSidebar";
import MinimalSidebar from "../components/MinimalSidebar";
import MobileDrawer from "../components/MobileDrawer";
import { MenuIcon } from "../components/Icons";

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

const ChatPage = () => {
  const dispatch = useDispatch();

  const { handleGetChats, fetchChatMessages } = useChat();

  const allChats = useSelector((state) => state.chat.chats);
  const { user } = useSelector((state) => state.auth);
  let currentChatId = useSelector((state) => state.chat.currentChatId);

  const [userMessage, setUserMessage] = useState();
  const [threadsOpen, setThreadsOpen] = useState(false);

  console.log("currentChatId in the ChatPage", currentChatId);
  console.log("userMessage state inside ChatPage:", userMessage);
  console.log("allChats inside ChatPage:", allChats);

  const firstname = user.user?.split(" ")[0];

  useEffect(() => {
    handleGetChats();
    if (currentChatId) {
      fetchChatMessages(currentChatId);
    }
  }, []);

  const openChat = (chatId) => {
    dispatch(setCurrentChatId(chatId));
    fetchChatMessages(chatId);
    setThreadsOpen(false); // close the drawer after picking a thread on mobile
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
      <MinimalSidebar />

      {/* Threads Panel (Secondary adjacent sidebar) */}

      <MobileDrawer
        open={threadsOpen}
        onClose={() => setThreadsOpen(false)}
      >
        <ChatSidebar
          allChats={allChats}
          openChat={openChat}
          handleAddNewChat={handleAddNewChat}
        />
      </MobileDrawer>

      {/* Chat Main */}

      <main className="flex-1 flex flex-col bg-[#FFFEF2] relative z-10">
        <header className="h-16 border-b border-[#191918]/10 flex items-center px-4 sm:px-10 justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setThreadsOpen(true)}
              aria-label="Open conversations"
              className="md:hidden text-[#191918] cursor-pointer flex"
            >
              <MenuIcon />
            </button>
            <div className="w-1 h-1 bg-[#FCAA2D] rounded-full" />
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-[#191918]">
              {currentChatId
                ? `Repository: ${allChats[currentChatId]?.title}`
                : `Exploration`}
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-[15%] pt-16 pb-8 main_chat">
          {/* if theres no chatId means there's no chat so we render a welcome message */}
          {!currentChatId && (
            <div className="flex flex-col gap-6">
              <h3 className="text-center">Welcome to Inkpot Chat</h3>
              <ChatInput
                currentChatId={currentChatId}
                setUserMessage={setUserMessage}
              />
            </div>
          )}

          {/* if currentChatId exists then display the chat messages */}
          {currentChatId &&
            allChats[currentChatId]?.messages?.map((msg) => {
              // msg is an object
              const isUser = msg.role === "user";
              console.log("msg ids:", msg._id);
              return (
                <div
                  key={msg._id}
                  className={`mb-6 w-full flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-175 ${!isUser ? "border-l-2 border-[#FCAA2D] pl-6" : ""}`}
                  >
                    <div
                      className={`font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#191918]/40 mb-2 ${isUser ? "text-right" : "text-left"}`}
                    >
                      <span>{isUser ? firstname : "INKPOT"}</span>
                    </div>
                    <div
                      className={`leading-[1.8] ${isUser ? "text-sm text-[#191918]/50 italic text-right bg-[#f2f0de] px-3 py-2 rounded-md" : "text-sm text-[#191918]/80  px-3 py-2 font-light text-left prose max-w-none"}`}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* Implementing optimistic UI pattern so user sees their message straight away. As long as userMessage exists in state, display that, when it becomes empty on response from server, its place is taken by server messages */}
          {userMessage && (
            <div className="mb-6 w-full flex justify-end ">
              <div className="max-w-175 pl-6">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#191918]/40 mb-2 text-right">
                  <span>{firstname}</span>
                </div>
                <div className="leading-[1.8] text-sm text-[#191918]/50 italic text-right bg-[#f2f0de] px-3 py-2 rounded-md">
                  {" "}
                  {userMessage}
                </div>
              </div>
            </div>
          )}
        </div>

        {currentChatId && (
          <div className="px-4 sm:px-8 lg:px-[15%] pb-8 pt-8 bg-linear-to-t from-[#FFFEF2] from-80% to-transparent">
            {/* chat Input */}
            <ChatInput
              currentChatId={currentChatId}
              setUserMessage={setUserMessage}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatPage;
