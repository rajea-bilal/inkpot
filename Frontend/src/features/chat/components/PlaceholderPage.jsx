import React from 'react';

const PlaceholderPage = ({ title }) => (
  <main className="grow h-screen overflow-y-auto p-16 relative">
    <div className="absolute top-[15%] left-[10%] w-[80%] h-[60%] blur-[80px] pointer-events-none z-0"
         style={{ background: 'radial-gradient(circle at 40% 40%, rgba(252, 170, 45, 0.04) 0%, rgba(100, 116, 139, 0.04) 100%)' }}>
    </div>
    
    <div className="relative z-10 flex items-center justify-center h-[80%]">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-[-0.025em] mb-2">{title}</h1>
        <p className="text-[#191918]/45 text-base font-light">This section is coming soon.</p>
      </div>
    </div>
  </main>
);

export default PlaceholderPage;
