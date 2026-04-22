# ES Modules and Environment Variables Execution Order

## The Issue
When setting up a Node.js server using ES Modules (`import` syntax), the order in which files are loaded and executed can lead to unexpected bugs. Specifically, when configuring tools like Nodemailer, you might encounter an error like:

`Mail command failed: 530-5.7.0 Authentication Required.`

This happens even if your `.env` file and OAuth credentials are perfectly correct. The root cause is that the `process.env` variables required by Nodemailer are `undefined` at the exact moment the email transporter is initialized.

## Why did this happen?
When you start the server from `server.js` using ES Modules, Node.js goes through two distinct phases:

1. **Phase 1: The Import/Wiring Phase**
   Node.js scans the entry file (`server.js`) for `import` statements and follows them before executing any actual code. 
   - It reads `import app from "./src/app.js"` -> jumps to `app.js`
   - In `app.js`, it reads `import authRouter ...` -> jumps to `auth.routes.js`
   - In `auth.routes.js`, it reads `import ... from auth.controller.js` -> jumps to `auth.controller.js`
   - In `auth.controller.js`, it reads `import { sendEmail } from mail.service.js` -> jumps to `mail.service.js`
   
   At this point, it executes `mail.service.js` and creates the `nodemailer.createTransport()`. Because the `.env` variables haven't been loaded yet, `process.env.GOOGLE_USER` and others evaluate to `undefined`.

2. **Phase 2: The Execution Phase**
   After Node.js has evaluated all imports, it finally begins running the standard code in `server.js`. The line `dotenv.config()` is executed, and environment variables are loaded into memory—but it's too late because the email transporter has already been configured with `undefined` values.

## The Solution
To guarantee that environment variables are loaded into memory *before* any other imports are processed, you must instruct Node.js to evaluate `dotenv` at the very beginning of the "Import Phase".

**Change the top of `server.js` from:**
```javascript
import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
dotenv.config();
```

**To this:**
```javascript
import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";

// Now, process.env variables are guaranteed to be available 
// for all imports that follow.
```

By placing `import "dotenv/config";` at the very top of the entry file, Node.js processes and loads the environment variables as the absolute first step in Phase 1, ensuring all subsequently loaded modules (like `mail.service.js`) have access to the correct credentials.

---

# Mongoose `select: false` and Password Comparison

## The Issue
When setting up user authentication, it's a best practice to set `select: false` on the password field in the Mongoose schema. This prevents the hashed password from being accidentally sent to the frontend when retrieving user data. However, this causes an error during the login process:

```javascript
// In user.model.js
password: {
  type: String,
  select: false, // Prevents password from being returned in queries
}

// In auth.controller.js
const user = await userModel.findOne({ email });
const passwordMatch = await user.comparePassword(password); // Throws an error!
```

This throws an error inside the `comparePassword` function (e.g., when calling `bcrypt.compare`) because `this.password` evaluates to `undefined`. Mongoose honored the `select: false` rule and did not fetch the password from the database.

## The Solution
When you explicitly need the password—such as to verify it during a user login—you must tell Mongoose to temporarily override the `select: false` rule for that specific query.

You do this by chaining `.select("+password")` to your Mongoose query:

**Change this:**
```javascript
const user = await userModel.findOne({ email });
```

**To this:**
```javascript
const user = await userModel.findOne({ email }).select("+password");
```

By adding `+password`, Mongoose will retrieve all standard user fields *plus* the hidden password field. Now `this.password` will contain the hash, and the comparison will work flawlessly!
