import LoginForm from "../components/LoginForm";
import NoiseCanvas from "../components/NoiseCanvas";
import PulsingDot from "../components/PulsingDot";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Login = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  // check to prevent a logged-in user to access /login page
  // if there's no loading and there's a logged-in user
  // then always return them to the dashboard ("/")
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

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
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;
