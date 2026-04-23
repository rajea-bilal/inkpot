import * as z from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Please enter a valid email" }),
  password: z.string().min(6, "Password is required"),
});

export const registerSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be 20 characters or less"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
