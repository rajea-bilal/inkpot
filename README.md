# Inkpot

An AI-powered chat application that enables users to have multi-turn conversations with an LLM, maintaining full message history and conversation context.

## Problem Statement

Traditional chat interfaces lose context as conversations grow. Inkpot solves this by:
- Maintaining full message history for each conversation
- Formatting messages in LangChain's message format for accurate LLM context
- Providing persistent conversations that survive page navigation
- Handling both new chats and follow-up messages in a unified flow

## Tech Stack

### Backend
- **Runtime:** Node.js with ES modules
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **LLM Integration:** LangChain with Google GenAI and Mistral AI
- **Real-time Communication:** Socket.IO
- **Authentication:** JWT with bcryptjs password hashing
- **Email Service:** Nodemailer
- **Validation:** express-validator

### Frontend
- **Framework:** React 19 with Vite
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS with Tailwind CSS v4
- **Real-time Client:** Socket.IO client
- **Form Handling:** React Hook Form with Zod validation
- **HTTP Client:** Axios
- **UI Components:** Radix UI + shadcn/ui
- **Routing:** React Router v7
- **Icons:** Lucide React

## Architecture

### Data Flow

```
User Input → ChatPage (React)
  ↓
useChat Hook (API layer)
  ↓
chat.api.js (HTTP request)
  ↓
Backend: chat.controller.js (processes message + LangChain agent)
  ↓
Response: { chat, aiMessage }
  ↓
useChat Hook → dispatch setCurrentChat action
  ↓
chat.slice.js Redux reducer (updates store)
  ↓
ChatPage re-renders with new messages
```

### State Management

**Redux (`chat.slice.js`) holds:**
- `chats` — object keyed by chat ID, each with title and messages array
- `currentChatId` — the selected chat (persists across navigation)
- `isLoading` — loading state for async operations
- `error` — error messages from failed API calls

**Why Redux persists across navigation:** Redux is app-global state. When you navigate away from ChatPage, the component unmounts but Redux doesn't. When you return, the previously-selected chat and its ID are still there.

### Message Flow

1. **New Chat:** User sends a message with `currentChatId = null`
   - Backend creates a new chat, generates a title, runs LangChain agent
   - Response includes new `chat` object with ID
   - Frontend sets `currentChatId` to new ID and adds messages to store

2. **Follow-up Message:** User sends message with `currentChatId` set
   - Backend finds existing chat, appends message history, runs agent
   - Response has `chat = null` (no new chat created)
   - Frontend uses `chat?._id || chatId` to safely fall back to the existing ID

### API Endpoints

**Chat Operations:**
- `POST /api/chat` — Send message (creates chat if needed)
- `GET /api/chat` — Fetch all chats for logged-in user
- `GET /api/chat/:chatId/messages` — Fetch messages for a specific chat

**Auth:**
- `POST /api/auth/register` — Create account
- `POST /api/auth/login` — Login (JWT + refresh token in cookies)
- `GET /api/auth/me` — Get current user (auto-hydration on app mount)

## Key Design Decisions

### Redux Reducer vs Hook Logic
State transformation logic lives in `chat.slice.js` reducers, not in `useChat.js`. Why:
- **Separation of concerns:** Hooks handle side effects; reducers handle state
- **Debugging:** Redux DevTools shows exact server responses and state transitions
- **Reusability:** Same reducer can handle WebSocket messages, API calls, etc.

### Optional Chaining for Safety
When the backend returns `null` for an existing chat (follow-up message), optional chaining prevents crashes:
```js
chat?._id || chatId  // ✅ null?.property = undefined, falls back to chatId
chat._id || chatId   // 💥 null.property throws TypeError
```

### Message Formatting for LangChain
Messages are formatted in LangChain's standard format before sending to the LLM:
```js
[
  { role: "user", content: "..." },
  { role: "ai", content: "..." },
  ...
]
```
This ensures the agent has full conversation context for accurate responses.

## Bugs Encountered & Solutions

### 1. Mismatched Request Keys (Frontend ↔ Backend)
**Problem:** Frontend sent `{ chatId }`, backend expected `{ chat }`. Backend never found the ID, created a new chat every message.

**Solution:** Unified key names across frontend and backend. Frontend now sends `{ chatId }`, backend receives it as `chatId`.

**Lesson:** Define API contracts early. Document request/response shapes.

---

### 2. Null Reference on Follow-up Messages
**Problem:** For follow-up messages, backend returns `chat: null`. Frontend code tried `chat._id`, which crashed on `null._id`.

**Solution:** Used optional chaining: `chat?._id || chatId`. This safely returns `undefined` before the fallback evaluates.

**Lesson:** Always protect null/undefined access, especially when data shapes vary between "new" and "existing" flows.

---

### 3. User State Lost on Page Refresh
**Problem:** Redux auth state would reset on refresh, even though user was still logged in server-side.

**Solution:** Created `handleGetMe` in `useAuth` hook. Called on app mount (inside `App.js` useEffect) to "hydrate" the logged-in user's info from the backend token.

**Lesson:** JWT token in cookies persists across refresh, but Redux state doesn't. Hydrate on mount.

---

### 4. Redux State Persists Across Navigation
**Problem (not really a bug):** When navigating away from ChatPage and back, the `currentChatId` and messages were still there. Seemed magical at first.

**Solution (Understanding):** Redux is app-global and doesn't unmount with components. Leveraged this intentionally: on ChatPage mount, check if `currentChatId` is set, and if so, fetch messages immediately. This gives seamless "return to last chat" UX.

## How to Get Started

### Backend
```bash
cd Backend
npm install
npm run dev
```

Requires `.env` with MongoDB URI, JWT secret, LangChain API keys, and email config.

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

Runs on `http://localhost:5173` by default.



1. **Proper Redux patterns:** Logic in reducers, hooks handle side effects
2. **Defensive coding:** Optional chaining, error handling, validation
3. **API design:** Clear separation between new and existing chat flows
4. **Real-time ready:** Socket.IO integrated for future message streaming
5. **Security:** JWT with refresh tokens, password hashing, validated input
6. **User experience:** Persistent state across navigation, full message context for LLM
7. **Problem-solving:** Documented bugs and solutions show debugging methodology
