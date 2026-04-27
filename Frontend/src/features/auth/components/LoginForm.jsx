import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { loginSchema } from "../schemas/auth.schema";
import { setUser, setLoading, setError } from "../auth.slice";
import { Input } from "@/components/ui/input";

import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const ArrowRightIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const LoginForm = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error: authError,
    user,
  } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const submitForm = async (data) => {
    console.log("payload at Login page", data);
    handleLogin({ email: data.email, password: data.password });
    navigate("/");
  };

  return (
    <div className="w-full max-w-[380px] p-8 mx-auto">
      {user ? (
        <div className="text-center">
          <h2 className="font-sans font-bold text-2xl mb-2 tracking-tight text-[#191918]">
            Welcome back!
          </h2>

          <p className="text-[#191918]/[0.45] text-[0.9rem]">
            You've successfully signed in to Mosaic.
          </p>

          <button
            onClick={() => dispatch(setUser(null))}
            className="mt-6 font-mono text-[0.7rem] text-[#191918]/[0.45] uppercase tracking-[0.1em] bg-transparent border-none cursor-pointer hover:text-[#191918] transition-colors"
          >
            Sign out
          </button>
        </div>
      ) : (
        <>
          <h2 className="font-sans font-bold text-2xl mb-2 tracking-tight text-[#191918]">
            Log In
          </h2>

          <p className="font-sans text-[#191918]/[0.45] text-[0.9rem] mb-8">
            Access your research workspace.
          </p>

          {authError && (
            <div className="mb-6 bg-[#e53e3e]/10 border border-[#e53e3e]/20 rounded-md p-3">
              <p className="text-[#e53e3e] text-[0.8rem] font-sans">
                {authError}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(submitForm)} noValidate>
            <div className="mb-5">
              <label className="block font-mono text-[0.65rem] uppercase tracking-[0.05em] text-[#191918]/[0.45] mb-2">
                Email Address
              </label>

              <Input
                type="email"
                placeholder="name@company.com"
                {...register("email")}
                className="h-auto w-full bg-[#191918]/[0.02] border-[#191918]/[0.12] rounded-md px-4 py-3 font-sans text-[0.9rem] text-[#191918] transition-colors duration-200 outline-none focus-visible:ring-0 focus-visible:border-[#191918]/[0.45] shadow-none"
              />

              {errors.email && (
                <p className="text-[#e53e3e] text-[0.7rem] mt-1 font-mono">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-baseline mb-2">
                <label className="block font-mono text-[0.65rem] uppercase tracking-[0.05em] text-[#191918]/[0.45]">
                  Password
                </label>
              </div>

              <Input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="h-auto w-full bg-[#191918]/[0.02] border-[#191918]/[0.12] rounded-md px-4 py-3 font-sans text-[0.9rem] text-[#191918] transition-colors duration-200 outline-none focus-visible:ring-0 focus-visible:border-[#191918]/[0.45] shadow-none"
              />

              {errors.password && (
                <p className="text-[#e53e3e] text-[0.7rem] mt-1 font-mono">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`group w-full bg-[#FCAA2D] text-[#191918] p-3 rounded-md font-mono text-[0.75rem] font-semibold uppercase tracking-[0.1em] border-none cursor-pointer flex items-center justify-center gap-2 mt-6 transition-[filter] duration-200 ${
                loading
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:brightness-105"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && (
                <ArrowRightIcon className="transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1 inline-flex" />
              )}
            </button>
          </form>

          <div className="mt-4 flex flex-col gap-3 items-center">
            {/* <Link
              to="/forgot-password"
              className="font-mono text-[0.6rem] text-[#191918]/[0.45] uppercase tracking-[0.1em] transition-colors duration-200 hover:text-[#191918] no-underline"
            >
              Forgot password
            </Link> */}

            <Link
              to="/register"
              className="font-mono text-[0.6rem] text-[#191918]/[0.45] uppercase tracking-[0.1em] transition-colors duration-200 hover:text-[#191918] no-underline"
            >
              Don't have an account yet? Register
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginForm;
