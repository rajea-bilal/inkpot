import { useEffect, useState } from "react";

const PulsingDot = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % 100);
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const t = phase / 100;
  const opacity = 0.5 + 0.5 * Math.abs(Math.sin(t * Math.PI));
  const shadowSize = 4 * Math.max(0, Math.sin(t * Math.PI));
  const shadowOpacity = 0.5 * Math.max(0, 1 - t * 2);

  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full bg-[#28C840] transition-none"
      style={{
        opacity,
        boxShadow: `0 0 0 ${shadowSize}px rgba(40,200,64,${shadowOpacity})`,
      }}
    />
  );
};

export default PulsingDot;
