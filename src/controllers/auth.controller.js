import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

// registers a new user
// POST api/auth/register
// access - Public
// body - { username, email, password }
export async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  console.log("request for registering reached controller", req.body);
  try {
    const userAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (userAlreadyExists) {
      return res.status(400).json({
        message: "user already exists",
        success: false,
        err: "user already exists",
      });
    }

    const user = await userModel.create({
      username,
      email,
      password,
    });

    const emailVerificationToken = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET,
    );

    // to, subject, html, text
    await sendEmail({
      to: email,
      subject: "Welcome to Inkpot",
      html: `<p>Hi ${username},</p>
      <p>Thank you for registering at <strong>Inkpot</strong>. We're excited to have you on board :)</p>
      <p>Please verify your email by clicking the <a href=http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}>link</a></p>
      <p>Thanks, Inpot Team</p>`,
    });

    res.status(201).json({
      message: "user registered successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
    // nodemailer gives server functionality to send email
    // nodemail needs 4 things:
    // client id, client secret, refresh token
  } catch (err) {
    res.status(200).json({
      message: err.message,
    });
  }
}

// logins a user and returns JWT token
// POST api/auth/login
// access - Public
// body - {  email, password }
export async function loginUserController(req, res) {
  // capture email, password from incoming req
  // check if a user doc with email exists inside users collection
  // check if entered password matches hashed password in the db
  // check if user is verified
  // will only generate token if user is verified
  // generate JWT token and set it inside client's browser

  const { email, password } = req.body;
  console.log("login controller reached");
  console.log("email from login", email);
  const user = await userModel.findOne({ email }).select("+password");

  console.log("user found in db", user);
  if (!user) {
    return res.status(401).json({
      message: "user doesnt exist",
    });
  }

  const passwordMatch = await user.comparePassword(password);
  console.log("passwordMatch", passwordMatch);

  if (!passwordMatch) {
    return res.status(400).json({
      message: "invalid email or password",
      success: false,
      err: "incorrect password",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: "please verify your email before logging in",
      success: false,
      err: "email not verified",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user logged in successfully",
    user: {
      id: user._id,
      username: user.username,
    },
  });
}

// verifies email of a new user
// POST api/auth/verify-email
// access - Public
// query - { token }
export async function verifyEmailController(req, res) {
  console.log("verify-token controller ran");

  try {
    const { token } = req.query;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
        status: false,
        err: "User not found",
      });
    }

    user.verified = true;

    await user.save();

    const html = `<h1>Email verified successfully</h1>
    <p>Your email has been verified. You can now log in to your account.</p>
    <a href=http://localhost:3000/login>Go to login</a>`;

    return res.send(html);
  } catch (err) {
    return res.status(400).json({
      message: "invalid or expired token",
      success: false,
      err: err.message,
    });
  }
}

export async function getMeController(req, res) {
  const userId = req.user.id;

  console.log("userId", userId);
  const user = await userModel.findById(userId);
  console.log("user", user);

  if (!user) {
    return res.status(400).json({
      message: "user not found",
      success: false,
      err: "user not found",
    });
  }

  return res.status(200).json({
    message: "user fetched successfully",
    success: true,
    user: {
      user: user.username,
      id: user._id,
      verified: user.verified,
    },
  });
}
