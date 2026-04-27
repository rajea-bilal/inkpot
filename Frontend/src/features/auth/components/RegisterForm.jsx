import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { registerSchema } from "../schemas/auth.schema";
import { Input } from "@/components/ui/input";

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

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Registration failed");
        return;
      }

      alert("Registration successful");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-[380px] p-8 mx-auto">
      <h2 className="font-sans font-bold text-2xl mb-2 tracking-tight text-[#191918]">
        Register
      </h2>

      <p className="font-sans text-[#191918]/[0.45] text-[0.9rem] mb-8">
        Create your account to access your autonomous workspace.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-5">
          <label className="block font-mono text-[0.65rem] uppercase tracking-[0.05em] text-[#191918]/[0.45] mb-2">
            Email Address
          </label>

          <Input
            id="email"
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
          <label className="block font-mono text-[0.65rem] uppercase tracking-[0.05em] text-[#191918]/[0.45] mb-2">
            Username
          </label>

          <Input
            id="username"
            type="text"
            placeholder="alice_smith"
            {...register("username")}
            className="h-auto w-full bg-[#191918]/[0.02] border-[#191918]/[0.12] rounded-md px-4 py-3 font-sans text-[0.9rem] text-[#191918] transition-colors duration-200 outline-none focus-visible:ring-0 focus-visible:border-[#191918]/[0.45] shadow-none"
          />

          {errors.username && (
            <p className="text-[#e53e3e] text-[0.7rem] mt-1 font-mono">
              {errors.username.message}
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
            id="password"
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
          disabled={isSubmitting}
          className={`group w-full bg-[#FCAA2D] text-[#191918] p-3 rounded-md font-mono text-[0.75rem] font-semibold uppercase tracking-[0.1em] border-none cursor-pointer flex items-center justify-center gap-2 mt-6 transition-[filter] duration-200 ${
            isSubmitting
              ? "opacity-75 cursor-not-allowed"
              : "hover:brightness-105"
          }`}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
          {!isSubmitting && (
            <ArrowRightIcon className="transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1 inline-flex" />
          )}
        </button>
      </form>

      <div className="mt-4 flex flex-col gap-3 items-center">
        <Link
          to="/login"
          className="font-mono text-[0.6rem] text-[#191918]/[0.45] uppercase tracking-[0.1em] transition-colors duration-200 hover:text-[#191918] no-underline"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
