import React, { useState } from 'react';
import { HomeIcon, MessageSquareIcon, MicroscopeIcon, MailIcon, LayersIcon, ListTreeIcon, SettingsIcon, HelpCircleIcon, UserIcon, ScrollIcon, PaperclipIcon, ArrowUpIcon, MoreHorizontalIcon } from '../components/Icons';

const threads = [
  { id: 1, title: 'The Architecture of Attention', meta: '2m ago — 14 entries', active: true },
  { id: 2, title: 'Market Resonance & Cadence', meta: 'Yesterday', active: false },
  { id: 3, title: 'A Lexicon of Human Desire', meta: 'Oct 12, 2024', active: false },
  { id: 4, title: 'The Great API of Records', meta: 'Oct 09, 2024', active: false },
];

const initialMessages = [
  {
    id: 1,
    role: 'user',
    content: (
      <span>
        Can we explore how the "quiet luxury" trend is influencing digital interface design, specifically in terms of negative space and typography?
      </span>
    ),
  },
  {
    id: 2,
    role: 'archive',
    content: (
      <div>
        <p className="mb-6">
          Quiet luxury in digital interfaces manifests as a rejection of the "engagement-optimized" clutter. It is a return to editorial values: generous margins, high-contrast typography, and a deliberate pace.
        </p>
        <p>
          The "luxury" is found in what is omitted. By providing 4rem of horizontal breathing room and strictly managing vertical rhythm, we signal to the user that their attention is valued, not harvested.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    role: 'user',
    content: (
      <span>
        That makes sense. Doesn't that risk making interfaces feel disconnected or too sparse for high-density applications like dashboards?
      </span>
    ),
  },
  {
    id: 4,
    role: 'archive',
    content: (
      <div>
        <p className="mb-6">
          It is a delicate balance. High-density applications often confuse density with proximity. Quiet luxury in a dashboard setting relies on structural hierarchy—using subtle typographic shifts rather than boxed cards or aggressive color-coding. 
        </p>
        <p>
          When you strip away drop shadows and generic borders, you force the data itself to carry the narrative. The sparse aesthetic clarifies function rather than obscuring it.
        </p>
      </div>
    ),
  }
];

const NavIcon = ({ children, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`transition-colors duration-200 cursor-pointer ${active ? 'text-[#191918]' : 'text-[#191918]/50 hover:text-[#191918]'}`}
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
        ${isActive ? 'bg-[#FCAA2D]/5' : 'hover:bg-[#191918]/5 bg-transparent'}`}
    >
      <div className={`font-sans text-[0.82rem] mb-1 text-[#191918] ${isActive ? 'font-medium' : 'font-normal'}`}>
        {thread.title}
      </div>
      <div className="font-mono text-[0.6rem] text-[#191918]/50 uppercase">
        {thread.meta}
      </div>
    </div>
  );
};

const ChatPage = ({ activeNav, setActiveNav, onNavigateHome }) => {
  const [activeThread, setActiveThread] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(initialMessages);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      role: 'user',
      content: <span>{inputValue}</span>,
    };
    setMessages([...messages, newMsg]);
    setInputValue('');
    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        role: 'archive',
        content: (
          <div>
            <p>Your inquiry has been received and catalogued within Inkpot's archives. The lineage of thought continues to expand.</p>
          </div>
        ),
      };
      setMessages(prev => [...prev, reply]);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex h-screen w-full font-sans antialiased text-[#191918] bg-[#FFFEF2] relative">
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.04]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Global Nav (Thin minimal sidebar) */}
      <nav className="w-16 bg-[#F9F8E8] border-r border-[#191918]/10 flex flex-col items-center py-6 gap-8 shrink-0 relative z-10 overflow-y-auto overflow-x-hidden">
        <div className="mb-4">
          <div onClick={onNavigateHome} className="w-8 h-8 rounded bg-[#191918] flex items-center justify-center text-white font-bold text-lg font-sans cursor-pointer transition-opacity hover:opacity-80">
            I
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <NavIcon active={activeNav === 'home'} onClick={() => setActiveNav('home')}>
            <HomeIcon />
          </NavIcon>
          <NavIcon active={activeNav === 'chat'} onClick={() => setActiveNav('chat')}>
            <MessageSquareIcon />
          </NavIcon>
          <NavIcon active={activeNav === 'research'} onClick={() => setActiveNav('research')}>
            <MicroscopeIcon />
          </NavIcon>
          <NavIcon active={activeNav === 'emails'} onClick={() => setActiveNav('emails')}>
            <MailIcon />
          </NavIcon>
          <NavIcon active={activeNav === 'sources'} onClick={() => setActiveNav('sources')}>
            <LayersIcon />
          </NavIcon>
          <NavIcon active={activeNav === 'threads'} onClick={() => setActiveNav('threads')}>
            <ListTreeIcon />
          </NavIcon>
        </div>
        <div className="mt-auto flex flex-col gap-6 mb-6">
          <NavIcon active={activeNav === 'settings'} onClick={() => setActiveNav('settings')}>
            <SettingsIcon />
          </NavIcon>
          <NavIcon active={activeNav === 'support'} onClick={() => setActiveNav('support')}>
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
      <aside className="w-[280px] bg-[#FFFEF2] border-r border-[#191918]/10 flex flex-col shrink-0 relative z-10">
        <div className="p-6 border-b border-[#191918]/10">
          <div className="font-mono text-[0.65rem] uppercase tracking-widest text-[#191918]/50 mb-1">
            Conversations
          </div>
          <div className="font-sans font-medium text-sm text-[#191918]">
            Threads
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {threads.map(thread => (
            <ThreadItem
              key={thread.id}
              thread={thread}
              isActive={activeThread === thread.id}
              onClick={() => setActiveThread(thread.id)}
            />
          ))}
        </div>
        <div className="p-4 border-t border-[#191918]/10">
          <button className="w-full py-2 border border-[#191918]/10 rounded font-mono text-[0.65rem] uppercase tracking-widest bg-transparent hover:bg-white transition-colors duration-200 cursor-pointer text-[#191918]">
            New Chat
          </button>
        </div>
      </aside>

      {/* Chat Main */}
      <main className="flex-1 flex flex-col bg-[#FFFEF2] relative z-10">
        <header className="h-16 border-b border-[#191918]/10 flex items-center px-10 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 bg-[#FCAA2D] rounded-full" />
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-[#191918]">
              Repository: {threads.find(t => t.id === activeThread)?.title}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[0.65rem] text-[#191918]/50">
              STATUS: COMMUNION ESTABLISHED
            </span>
            <span className="text-[#191918]/50 text-xl cursor-pointer flex items-center justify-center">
              <MoreHorizontalIcon />
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-[15%] pt-16 pb-8">
          {messages.map(msg => {
            const isUser = msg.role === 'user';
            return (
              <div key={msg.id} className={`mb-20 w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[700px] ${!isUser ? 'border-l border-[#191918]/10 pl-6' : ''}`}>
                  <div className={`font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#191918]/40 mb-4 ${isUser ? 'text-right' : 'text-left'}`}>
                    <span>{isUser ? 'HUMAN' : 'INKPOT'}</span>
                  </div>
                  <div className={`leading-[1.8] ${isUser ? 'text-[1rem] text-[#191918]/50 italic text-right' : 'text-[1.05rem] text-[#191918] font-light text-left'}`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-[15%] pb-8 pt-8 bg-gradient-to-t from-[#FFFEF2] from-80% to-transparent">
          <div className="border border-[#191918]/10 rounded-lg bg-[#FAF9ED] p-3 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <span className="text-[#191918]/50 cursor-pointer flex">
              <PaperclipIcon />
            </span>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What should we explore today..."
              className={`flex-1 border-none outline-none bg-transparent font-sans text-[0.95rem] text-[#191918] ${inputValue ? 'not-italic' : 'italic'}`}
            />
            <button
              onClick={handleSend}
              className="bg-[#FCAA2D] text-[#191918] w-8 h-8 rounded flex items-center justify-center transition-opacity duration-200 border-none cursor-pointer hover:opacity-80"
            >
              <ArrowUpIcon />
            </button>
          </div>
          <div className="mt-3 text-center">
            <span className="font-mono text-[0.55rem] text-[#191918]/50 italic">
              Intelligence is only as sharp as its ancestry. Speak clearly.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
