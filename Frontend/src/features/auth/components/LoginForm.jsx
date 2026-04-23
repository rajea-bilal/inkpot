import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema } from "../schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Login failed");
        return;
      }

      alert("Login successful");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <div className="mb-10">
        <h2 className="mb-2 text-2xl font-normal tracking-tight text-[#2d2824] lg:text-3xl">
          Login
        </h2>
        <p className="text-sm font-normal text-[#8f8880]">
          Authenticate to access your autonomous workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-xs font-medium uppercase tracking-widest text-[#6e6862]"
          >
            Email
          </label>

          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <span className="text-lg text-[#a39c94] transition-colors group-focus-within:text-orange-500">
                @
              </span>
            </div>

            <Input
              id="email"
              type="email"
              placeholder="alica_smith@gmail.com"
              {...register("email")}
              className="h-auto w-full rounded-xl border border-transparent bg-[#f4f1eb] py-3 pr-4 pl-11 text-sm text-[#2d2824] placeholder:text-[#b0a8a0] focus-visible:border-orange-500/30 focus-visible:bg-[#fdfbf6] focus-visible:ring-4 focus-visible:ring-orange-500/10"
            />
          </div>

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-medium uppercase tracking-widest text-[#6e6862]"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-xs font-medium text-[#8f8880] transition-colors hover:text-orange-600"
            >
              Recover?
            </Link>
          </div>

          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <span className="text-sm text-[#a39c94] transition-colors group-focus-within:text-orange-500">
                ••
              </span>
            </div>

            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="h-auto w-full rounded-xl border border-transparent bg-[#f4f1eb] py-3 pr-4 pl-11 text-sm text-[#2d2824] placeholder:text-[#b0a8a0] focus-visible:border-orange-500/30 focus-visible:bg-[#fdfbf6] focus-visible:ring-4 focus-visible:ring-orange-500/10"
            />
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <label className="mt-1 flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            {...register("rememberMe")}
            className="peer sr-only"
          />

          <div className="flex h-4 w-4 items-center justify-center rounded border border-[#a39c94] transition-all peer-checked:border-orange-500 peer-checked:bg-orange-500">
            <span className="text-[10px] text-white opacity-0 transition-opacity peer-checked:opacity-100">
              ✓
            </span>
          </div>

          <span className="select-none text-xs text-[#6e6862] transition-colors hover:text-[#2d2824]">
            Maintain connection
          </span>
        </label>

        <div className="mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full rounded-xl bg-gradient-to-b from-[#e8e2d9] to-transparent p-[1px] shadow-sm outline-none transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <div className="relative flex items-center justify-center gap-2 overflow-hidden rounded-[calc(0.75rem-1px)] bg-[#1a1714] px-4 py-3.5 transition-all duration-200 group-hover:bg-[#2d2824]">
              <div className="pointer-events-none absolute top-0 left-0 h-1/2 w-full rounded-t-[calc(0.75rem-1px)] bg-white/5" />
              <span className="relative z-10 text-sm font-medium tracking-wide text-[#fdfbf6]">
                {isSubmitting ? "Authenticating..." : "Authenticate"}
              </span>
              <span className="relative z-10 text-base text-[#fdfbf6] transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </button>
        </div>
      </form>

      <div className="mt-8 border-t border-[#e8e2d9]/60 pt-6 text-center">
        <p className="text-xs text-[#8f8880]">
          Need to register first?
          <Link
            to="/register"
            className="ml-1 font-medium text-[#2d2824] underline decoration-[#e8e2d9] underline-offset-4 transition-colors hover:text-orange-600 hover:decoration-orange-300"
          >
            Register account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
