import { Link, useLocation } from "react-router";
import NoiseCanvas from "../components/NoiseCanvas";
import PulsingDot from "../components/PulsingDot";

const MailIcon = ({ className }) => (
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
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const VerifyEmail = () => {
  // state is null when the page is reached directly (refresh, bookmark, typed URL),
  // so read it defensively rather than destructuring off a possible null.
  const email = useLocation().state?.email;

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
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-1 bg-[#FCAA2D] rounded-full" />
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[#191918]/45">
              Account created
            </span>
          </div>

          <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[#FCAA2D]/10 border border-[#191918]/10 text-[#191918] mb-6">
            <MailIcon />
          </div>

          <h2 className="font-sans font-bold text-2xl mb-2 tracking-tight text-[#191918]">
            Check your email
          </h2>

          <p className="font-sans text-[#191918]/[0.45] text-[0.9rem] leading-[1.6] mb-8">
            {email ? (
              <>
                We sent a verification link to{" "}
                <span className="text-[#191918] font-medium">{email}</span>. Open
                it and click the link to activate your account.
              </>
            ) : (
              <>
                We sent you a verification link. Open your inbox and click the
                link to activate your account.
              </>
            )}
          </p>

          <div className="flex flex-col gap-3 items-center">
            <Link
              to="/login"
              className="font-mono text-[0.6rem] text-[#191918]/[0.45] uppercase tracking-[0.1em] transition-colors duration-200 hover:text-[#191918] no-underline"
            >
              Back to login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyEmail;
