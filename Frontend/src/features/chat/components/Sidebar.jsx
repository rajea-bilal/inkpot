import React from 'react';
import { HomeIcon, MessageSquareIcon, MicroscopeIcon, MailIcon, LayersIcon, ListTreeIcon, SettingsIcon, HelpCircleIcon } from './Icons';

const NavItem = ({ icon, label, active, onClick }) => {
  return (
    <div
      className={`flex items-center gap-3 py-2.5 px-3 font-mono text-[0.72rem] uppercase tracking-wider rounded-md transition-all duration-200 mb-1 cursor-pointer no-underline select-none
        ${active ? 'bg-[#191918]/10 text-[#191918]' : 'text-[#191918]/45 hover:bg-[#191918]/5 hover:text-[#191918]'}`}
      onClick={onClick}
    >
      {icon}
      {label}
    </div>
  );
};

const Sidebar = ({ activeNav, setActiveNav }) => {
  const navItems = [
    { icon: <HomeIcon />, label: 'Home', key: 'home' },
    { icon: <MessageSquareIcon />, label: 'Chat', key: 'chat' },
    { icon: <MicroscopeIcon />, label: 'Research', key: 'research' },
    { icon: <MailIcon />, label: 'Emails', key: 'emails' },
    { icon: <LayersIcon />, label: 'Sources', key: 'sources' },
    { icon: <ListTreeIcon />, label: 'Threads', key: 'threads' },
  ];
  const bottomItems = [
    { icon: <SettingsIcon />, label: 'Settings', key: 'settings' },
    { icon: <HelpCircleIcon />, label: 'Support', key: 'support' },
  ];

  return (
    <aside className="w-[260px] h-screen border-r border-[#191918]/10 flex flex-col py-10 px-6 shrink-0 bg-[#FFFEF2] z-10">
      <div className="flex items-center gap-2 mb-12">
        <div className="w-5 h-5 bg-[#FCAA2D] rounded"></div>
        <span className="font-semibold text-lg tracking-[-0.025em]">Inkpot</span>
      </div>

      <nav className="flex-grow">
        {navItems.map(item => (
          <NavItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            active={activeNav === item.key}
            onClick={() => setActiveNav(item.key)}
          />
        ))}
        <div className="pt-8">
          {bottomItems.map(item => (
            <NavItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              active={activeNav === item.key}
              onClick={() => setActiveNav(item.key)}
            />
          ))}
        </div>
      </nav>

      <div className="mt-auto border-t border-[#191918]/10 pt-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center font-mono text-xs text-orange-800">
            MW
          </div>
          <div>
            <div className="text-sm font-medium leading-none mb-1">Marcus Webb</div>
            <div className="text-[0.65rem] text-[#191918]/45 font-mono">Premium Plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
