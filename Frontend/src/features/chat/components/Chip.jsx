import React from 'react';

const Chip = ({ label, onClick }) => {
  return (
    <span
      className="py-1.5 px-3 rounded-full border border-[#191918]/10 font-mono text-[0.65rem] text-[#191918]/45 transition-all duration-200 cursor-pointer bg-[#FFFEF2] hover:border-[#FCAA2D] hover:text-[#191918]"
      onClick={onClick}
    >
      {label}
    </span>
  );
};

export default Chip;
