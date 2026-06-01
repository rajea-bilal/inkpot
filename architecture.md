# Inkpot — Architecture Reference

This document explains how the app is structured, how data flows, and the patterns used. Written to be reused in future projects.

---

## The Big Picture

**Frontend** (React, runs on port 5173) talks to **Backend** (Express, runs on port 3000) via HTTP requests and cookies.

The user's identity is proven on every request by a **JWT token**, stored as a browser cookie. The frontend holds state in **Redux**. The backend holds permanent data in **MongoDB**.

---

## Part 1 — Frontend Structure

The frontend follows a **4-layer architecture**. Every feature (auth, chat) repeats this same pattern.

```
features/
  auth/
    pages/          ← Layer 1: what the user sees
    components/     ← Layer 2: reusable UI pieces
    hooks/          ← Layer 3: business logic
    service/        ← Layer 4: API calls
    auth.slice.js   ← Redux state for this feature
```

### Layer 1 — Pages

Pages are full-screen views. Each page maps to a URL route.

| File | Route | What it does |
|---|---|---|
| `Login.jsx` | `/login` | Login form |
| `Register.jsx` | `/register` | Registration form |
| `Dashboard.jsx` | `/` | Main app layout (protected) |
| `ChatPage.jsx` | rendered inside Dashboard | The chat interface |
| `HomePage.jsx` | rendered inside Dashboard | Welcome screen |

Pages don't contain logic. They render components and call hooks.

### Layer 2 — Components

Reusable UI pieces used inside pages.

| File | What it does |
|---|---|
| `Protected.jsx` | Wraps a page — redirects to `/login` if no user in Redux |
| `LoginForm.jsx` | The form fields and submit button for login |
| `RegisterForm.jsx` | The form fields and submit button for registration |
| `ChatInput.jsx` | The text input at the bottom of the chat |
| `Sidebar.jsx` | Navigation sidebar listing chats |

### Layer 3 — Custom Hooks

Hooks are where the business logic lives. They read/write Redux state and call the service layer. Pages call hooks; hooks call services.

| File | What it does |
|---|---|
| `useAuth.js` | `handleRegister`, `handleLogin`, `handleGetMe` |
| `useChat.js` | `handleSendChatMessage`, `handleGetChats`, `handleOpenChat` |

**The pattern every hook follows:**
1. Set `loading: true` in Redux
2. Call the service (API request)
3. Dispatch the result into Redux
4. Set `loading: false`
5. If it fails, dispatch the error into Redux

### Layer 4 — Services

Services are plain functions that make HTTP requests. No logic, no Redux — just axios calls.

| File | Talks to |
|---|---|
| `auth.api.js` | `/api/auth/*` endpoints |
| `chat.api.js` | `/api/chats/*` endpoints |
| `chat.socket.js` | Socket.IO connection (initialised, not yet used) |

Both axios instances are configured with:
```
baseURL: "http://localhost:3000"
withCredentials: true   ← this tells the browser to send cookies on every request
```

`withCredentials: true` is essential. Without it, the JWT cookie set at login would not be sent to the backend on subsequent requests.

### Redux — Global State

Redux holds the state that multiple components need to share.

**Store** (`app.store.js`):
```
store = {
  auth: { user, loading, error },
  chat: { chats, currentChatId, isLoading, error }
}
```

**Auth state** (`auth.slice.js`):

| Key | Type | What it holds |
|---|---|---|
| `user` | object / null | The logged-in user's data (`id`, `username`) |
| `loading` | boolean | True while checking if user is logged in on page load |
| `error` | string / null | Error messages from failed requests |

**Chat state** (`chat.slice.js`):

| Key | Type | What it holds |
|---|---|---|
| `chats` | object | All chats, indexed by `chatId` for fast lookup |
| `currentChatId` | string / null | Which chat is currently open |

Chats are stored as an object, not an array, so any chat can be found instantly by its ID:
```javascript
// Instead of searching an array:
chats["abc123"]  // O(1) — direct lookup
```

**Session restoration on page load** (`App.jsx`):

When the app first loads, it calls `GET /api/auth/get-me`. If the JWT cookie is still valid, the backend returns the user and it's stored in Redux. The `Protected` component waits for this check to finish (`loading: true`) before deciding to redirect or let the user through.

---

## Part 2 — Backend Structure

```
Backend/
  server.js          ← starts the HTTP server and Socket.IO
  src/
    app.js           ← sets up Express, middleware, routes
    config/
      database.js    ← connects to MongoDB
    routes/
      auth.routes.js
      chat.routes.js
    controllers/
      auth.controller.js
      chat.controller.js
    middlewares/
      auth.middleware.js   ← validates JWT on protected routes
    models/
      user.model.js
      chat.model.js
      message.model.js
    services/
      ai.service.js    ← LangChain, Gemini, Mistral
      mail.service.js  ← Nodemailer for verification emails
    validation/
      auth.validator.js
    sockets/
      server.socket.js
```

**Request lifecycle on a protected route:**

```
HTTP Request
  → Express router
  → authUser middleware (checks JWT cookie)
  → Controller (does the work)
  → Response sent back
```

---

## Part 3 — JWT Authentication Flow

### What JWT is

JWT (JSON Web Token) is a string the server generates and signs using a secret key (`JWT_SECRET`). It encodes data (like user ID) and cannot be tampered with without the key. The server can verify it was the one who created it.

Format: `header.payload.signature` — three base64-encoded parts joined by dots.

### Step 1 — Register (`POST /api/auth/register`)

1. Request arrives with `{ email, username, password }`
2. Validator checks the fields (email format, password length 6–12 chars)
3. MongoDB is checked — if email or username already exists, return error
4. User is saved to MongoDB — **password is automatically hashed** by a pre-save hook using bcrypt (10 salt rounds). The plain-text password is never stored.
5. An **email verification JWT** is generated:
   ```
   jwt.sign({ email, id }, JWT_SECRET)
   ```
6. An email is sent with a link containing this token:
   ```
   http://localhost:3000/api/auth/verify-email?token=<JWT>
   ```
7. Response returns `{ id, username, email }` — no session token yet

> **Note on your description:** You said "a JWT token is generated" at registration — that's true, but it's an *email verification* token, not a session token. The session token (used for auth) is only created at **login**, after the email is verified.

### Step 2 — Verify Email (`GET /api/auth/verify-email?token=<JWT>`)

1. The user clicks the link in their email
2. The backend extracts `token` from the query string
3. `jwt.verify(token, JWT_SECRET)` decodes it — if invalid, return error
4. The user is found in MongoDB by the email inside the token
5. `user.verified` is set to `true` and saved
6. An HTML page is returned saying "Email verified"

### Step 3 — Login (`POST /api/auth/login`)

1. Request arrives with `{ email, password }`
2. User is found in MongoDB — password field is explicitly selected (it's hidden by default)
3. `bcrypt.compare(enteredPassword, storedHashedPassword)` — if no match, return error
4. `user.verified` is checked — if false, return "please verify your email" error
5. A **session JWT** is generated (this is the real auth token):
   ```
   jwt.sign({ id, username }, JWT_SECRET, { expiresIn: "7d" })
   ```
6. The token is set as a **cookie** in the response:
   ```
   res.cookie("token", token)
   ```
7. Response returns `{ id, username }` — the token is in the cookie, not the response body

### Step 4 — Every Authenticated Request

1. The browser automatically sends the cookie with every request (because `withCredentials: true`)
2. `authUser` middleware extracts the token: `req.cookies.token`
3. `jwt.verify(token, JWT_SECRET)` decodes it
4. The decoded data (`{ id, username }`) is attached to the request: `req.user = decoded`
5. The controller uses `req.user.id` to know which user is making the request

### The complete JWT pattern — 3 things to remember

| Step | What happens | JWT involved |
|---|---|---|
| Register | User saved, verification email sent | Email verification token (no expiry) |
| Verify email | `verified: true` set in DB | Token decoded, then discarded |
| Login | Session started | Session token (7d expiry), stored in cookie |
| Every request | Identity confirmed | Cookie sent automatically, middleware verifies |

---

## Part 4 — All Endpoints

### Auth Routes — `/api/auth`

| Method | Path | Protected | What it does |
|---|---|---|---|
| `POST` | `/register` | No | Creates user, sends verification email |
| `POST` | `/login` | No | Validates password, returns session cookie |
| `GET` | `/verify-email?token=` | No | Sets `verified: true` on user |
| `POST` | `/resend-email` | No | Resends verification email |
| `GET` | `/get-me` | **Yes** | Returns current user from cookie |

### Chat Routes — `/api/chats`

| Method | Path | Protected | What it does |
|---|---|---|---|
| `POST` | `/message` | **Yes** | Sends message, gets AI response, saves to DB |
| `GET` | `/` | **Yes** | Returns all chats for current user |
| `GET` | `/:chatId/messages` | **Yes** | Returns all messages in a chat |
| `DELETE` | `/delete/:chatId` | **Yes** | Deletes a chat |

---

## Part 5 — How It All Connects (Full Request Flow)

**Example: User sends a chat message**

```
User clicks Send
  → ChatPage calls handleSendChatMessage (hook)
    → hook calls sendChatMessage({ message, chatId }) (service)
      → axios.post("http://localhost:3000/api/chats/message", { message, chatId })
        → browser attaches JWT cookie automatically (withCredentials: true)
          → Express router receives request
            → authUser middleware verifies JWT cookie → attaches req.user
              → handleChatRequest controller
                → gets userId from req.user.id
                → creates/finds chat in MongoDB
                → calls AI service (LangChain → Gemini)
                → saves AI message to MongoDB
                → returns { chat, aiMessage }
      → hook dispatches to Redux:
          dispatch(createNewChat(...))
          dispatch(addNewMessageToChat({ role: "user", content }))
          dispatch(addNewMessageToChat({ role: "ai", content }))
        → Redux state updates
          → useSelector in ChatPage picks up new state
            → component re-renders, messages appear
```

---

## Part 6 — Patterns to Reuse in Any Project

### Pattern 1 — The 4-Layer Frontend

Every feature = pages → components → hooks → services. State lives in Redux. Services never touch Redux. Pages never call services directly.

### Pattern 2 — JWT with Cookie Storage

- Generate JWT with `jwt.sign(payload, secret, { expiresIn })`
- Send it as a cookie with `res.cookie("token", token)`
- On the frontend, use `withCredentials: true` on every axios instance
- On the backend, use middleware to extract and verify on every protected route
- Never put the raw token in the response body — cookie storage is safer (not accessible by JavaScript, unlike localStorage)

### Pattern 3 — Two-Token Email Verification

1. At registration: generate a short-lived JWT, embed in email link
2. At email click: decode token, update DB, invalidate the flow
3. At login: only then generate the session JWT

### Pattern 4 — Protected Routes

```
Route → <Protected> → checks Redux auth.user
  if null → redirect to /login
  if loading → show spinner
  if user exists → render children
```

### Pattern 5 — Session Restoration

On app mount, call `GET /get-me`. If cookie is valid, backend returns user → dispatch into Redux → Protected component allows access. This keeps users logged in across page refreshes.

### Pattern 6 — Normalised State in Redux

When you get an array from the backend, convert it to an object indexed by ID:
```javascript
chats.reduce((obj, chat) => {
  obj[chat._id] = chat;
  return obj;
}, {})
```
This lets you do `chats[id]` instead of `.find()` on every render.

---

## Tech Stack Summary

| Layer | Technology |
|---|---|
| Frontend framework | React 19 |
| Routing | React Router 7 |
| State management | Redux Toolkit |
| HTTP client | Axios (withCredentials: true) |
| Forms | react-hook-form + Zod |
| UI components | shadcn/ui + Tailwind CSS 4 |
| Backend framework | Express 5 |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Email | Nodemailer + Gmail OAuth2 |
| Real-time | Socket.IO (initialised, not yet in use) |
| AI | LangChain + Google Gemini 2.5 Flash + Mistral Large |
