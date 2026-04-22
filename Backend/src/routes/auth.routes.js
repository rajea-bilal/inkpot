import { Router } from "express";
import {
  registerUserController,
  verifyEmailController,
  loginUserController,
  getMeController,
  resendEmailController,
} from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
} from "../validation/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";

// we reate a router object
// define our routes in separate files rather than putting everything inside app.js
// in app.js file we usually use app but in separate route files, we use router

const authRouter = Router();

// POST api/auth/register
// registers a new user
// access - Public
authRouter.post("/register", registerValidator, registerUserController);

// POST api/auth/login
// logins a user and returns JWT token
// access - Public
authRouter.post("/login", loginValidator, loginUserController);

// POST api/auth/verify-email
// verifies email of a new user
// access - Public
authRouter.get("/verify-email", verifyEmailController);

authRouter.post("/resend-email", resendEmailController);

// GET api/auth/get-me
// gets logged-in user's details
// access - Private
authRouter.get("/get-me", authUser, getMeController);

export default authRouter;
