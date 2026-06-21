import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import NoiseCanvas from "../components/NoiseCanvas";
import PulsingDot from "../components/PulsingDot";

const CheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const AlertIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const VerifiedEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  // One state instead of separate booleans — the page is only ever in
  // one of these three states, so an "impossible" combo can't happen.
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/auth/verify-email?token=${token}`,
          { withCredentials: true }
        );
        setMessage(response.data?.message || "Your email has been verified.");
        setStatus("success");
      } catch (error) {
        // error.response is absent on network failures, so chain defensively.
        setMessage(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
        setStatus("error");
      }
    };
    verifyEmail();
  }, [token]);

  const handleResendEmail = async () => {
    console.log("resending email");
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/resend-email`, {
        token
      });
      console.log("response", response);
      setMessage(response.data?.message || "Verification email resent successfully");
      setStatus("success");
    }
    catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="font-sans">
      <aside className="layout-aside layout-aside-responsive flex flex-col justify-between p-10 shadow-2xl text-white">
        <NoiseCanvas />
        <div className="panel-gradient" />

        <div className="flex items-center gap-2 relative z-10">
          <span className="font-semibold text-[0.95rem] tracking-[-0.01em]">
            Inkpot
          </span>
        </div>

        <div className="absolute top-10 right-10 z-10 flex items-center gap-2">
          <PulsingDot />
          <span className="font-mono text-[0.65rem] text-white/50 tracking-[0.05em]">
            All systems operational
          </span>
        </div>

        <div className="flex flex-col justify-center mb-12 relative z-10">
          <h1 className="font-bold text-[2.5rem] leading-[1.1] mb-6 tracking-[-0.02em]">
            Inkpot Research, write, and send - all from one intelligent
            workspace.
          </h1>

          <p className="text-[1.125rem] leading-[1.6] font-light mb-10 text-white/70 max-w-[24rem]">
            Inkpot connects live web research with your email, so you can ask
            questions, gather sources, draft replies, and send messages without
            switching tabs.
          </p>
        </div>

        <div className="relative z-10">
          <div className="font-mono flex items-center gap-3 text-[0.62rem] text-white/30 tracking-[0.15em] uppercase">
            <span>INKPOT.AI</span>
            <span className="text-white/15">—</span>
            <span>EST. 2026</span>
          </div>
        </div>
      </aside>

      <main className="layout-main layout-main-responsive">
        <div className="w-full max-w-[380px] p-8 mx-auto">
          {status === "loading" && (
            <>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-1 bg-[#FCAA2D] rounded-full" />
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[#191918]/45">
                  Verifying
                </span>
              </div>

              <div className="flex items-center justify-center w-12 h-12 mb-6">
                <div className="w-6 h-6 rounded-full border-2 border-[#191918]/10 border-t-[#FCAA2D] animate-spin" />
              </div>

              <h2 className="font-sans font-bold text-2xl mb-2 tracking-tight text-[#191918]">
                Verifying your email
              </h2>
              <p className="font-sans text-[#191918]/[0.45] text-[0.9rem] leading-[1.6]">
                Hold on a moment while we confirm your account.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-1 bg-[#FCAA2D] rounded-full" />
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[#191918]/45">
                  Verified
                </span>
              </div>

              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[#FCAA2D]/10 border border-[#191918]/10 text-[#191918] mb-6">
                <CheckIcon />
              </div>

              <h2 className="font-sans font-bold text-2xl mb-2 tracking-tight text-[#191918]">
                Email verified
              </h2>
              <p className="font-sans text-[#191918]/[0.45] text-[0.9rem] leading-[1.6] mb-8">
                {message} You can now log in to your account.
              </p>

              <Link
                to="/login"
                className="group w-full bg-[#FCAA2D] text-[#191918] p-3 rounded-md font-mono text-[0.75rem] font-semibold uppercase tracking-[0.1em] border-none cursor-pointer flex items-center justify-center gap-2 transition-[filter] duration-200 hover:brightness-105 no-underline"
              >
                Go to login
              </Link>
            </>
          )}
        {status === "resent" && (
              <>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-1 bg-[#FCAA2D] rounded-full" />
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[#191918]/45">
                  Verified
                </span>
              </div>

              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[#FCAA2D]/10 border border-[#191918]/10 text-[#191918] mb-6">
                <CheckIcon />
              </div>

              <h2 className="font-sans font-bold text-2xl mb-2 tracking-tight text-[#191918]">
                Check your inbox
              </h2>
              <p className="font-sans text-[#191918]/[0.45] text-[0.9rem] leading-[1.6] mb-8">
                {message} We sent you a verification link
              </p>

              <Link
                to="/login"
                className="group w-full bg-[#FCAA2D] text-[#191918] p-3 rounded-md font-mono text-[0.75rem] font-semibold uppercase tracking-[0.1em] border-none cursor-pointer flex items-center justify-center gap-2 transition-[filter] duration-200 hover:brightness-105 no-underline"
              >
                Back to login
              </Link>
            </>
        )}
          {status === "error" && (
            <>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-1 bg-[#e53e3e] rounded-full" />
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[#191918]/45">
                  Verification failed
                </span>
              
              </div>

              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[#e53e3e]/10 border border-[#e53e3e]/20 text-[#e53e3e] mb-6">
                <AlertIcon />
              </div>

            <div className="flex flex-col gap-3">

              <h2 className="font-sans font-bold text-2xl mb-2 tracking-tight text-[#191918]">
                We couldn't verify your email
              </h2>
              <button onClick={handleResendEmail} className="bg-[#FCAA2D] text-[#191918] p-3 rounded-md font-mono text-[0.75rem] font-semibold uppercase tracking-[0.1em] border-none cursor-pointer flex items-center justify-center gap-2 transition-[filter] duration-200 hover:brightness-105 no-underline">Resend Verification Email</button>
            </div>


              <div className="bg-[#e53e3e]/10 border border-[#e53e3e]/20 rounded-md p-3 mb-8">
                <p className="text-[#e53e3e] text-[0.8rem] font-sans">
                  {message}
                </p>
              </div>

              <div className="flex flex-col gap-3 items-center">
                <Link
                  to="/login"
                  className="font-mono text-[0.6rem] text-[#191918]/[0.45] uppercase tracking-[0.1em] transition-colors duration-200 hover:text-[#191918] no-underline"
                >
                  Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default VerifiedEmail;
