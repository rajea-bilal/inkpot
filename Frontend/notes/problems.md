Every time I refreshed the Dashboard, the logged-in user was being lost, the user state wouldn't persist and it would default to null (since the initial state for user was set as null in auth.slice)

I solved this problem by using the useAuth custom hook inside app.js file, saved the result of useAuth to an auth object, on this auth object we had a handleGetMe method. This method was responsbile for making an API call to the backend, retrieving the logged-in user's info. This user info was then set as user state.

I used a useEffect hook to run the handleGetMe method every time the app mounts, so the user data was 'hydrated' into the app.

---

### Where should the logic go: `useChat` hook vs `chat.slice.js`?

**The Question:** 
When receiving data from the backend (like new chat messages), should the logic for merging the new data with the existing state reside in the React hook (`useChat.js`) or the Redux slice (`chat.slice.js`)?

**The Solution:**
According to official Redux best practices, you should put as much logic as possible in reducers, while keeping components and hooks simple. State transformation logic belongs in the slice.

**Why? (The Technical Reasons):**
1. **Separation of Concerns:** The `useChat` hook's responsibility is to handle side effects (making API calls) and dispatching actions. It should simply dispatch the raw `payload` containing the server's response. It should not compute the next state.
2. **Reducer Responsibility:** The Redux reducer (inside `chat.slice.js`) is strictly responsible for calculating the new state. It takes the current `state` and the `action.payload`, and performs the logic needed to merge them (e.g., pushing a new message to the existing `messages` array). 
3. **Predictability and Debugging:** Redux DevTools tracks a history of dispatched actions. If you compute the new state in the hook and dispatch the final result, the DevTools only show the finished outcome. By dispatching the raw `payload` to the reducer, the DevTools log exactly what the server returned, making it clear whether a bug originated from malformed server data or faulty reducer logic.
4. **Reusability:** If you decouple the state transformation logic from the UI hook and place it entirely in the reducer, that logic can be reused globally. For example, if you later add a WebSocket listener that receives background messages, it can dispatch the exact same action to update the state without having to duplicate the array-merging logic.

---

### Bug: Every message creates a new chat (mismatched key names)

**Where:** Frontend `chat.api.js` → Backend `chat.controller.js`

The frontend sends the chat ID under the key `chatId`, but the backend was looking for it under the key `chat`. So the backend never found it — it was always `undefined` — and it created a brand new chat every time.

```js
// Frontend sends:
{ message, chatId }

// Backend expected:
const { message, chat: chatId } = req.body;   // looking for "chat", not "chatId"
```

**Fix:** Make the key names match on both sides.

---

### Bug: Duplicate messages appearing in chat

**Date:** 2026-05-24
**Status:** resolved

**Problem:**
Opening a conversation showed every message twice. React also logged warnings about "duplicate keys" in the console.

**Root cause:**
Two things went wrong together:

1. `setCurrentChat` in the slice used `push(...messages)` to add messages. Push *appends* — it doesn't replace. So if `handleOpenChat` got called twice for the same chat (once from HomePage when clicking a conversation, once from ChatPage's `useEffect` on mount), the same messages were pushed in twice.

2. Messages added locally via `addNewMessageToChat` have no `_id` (just `content` and `role`). The UI uses `key={msg._id}` on each message, so those messages all get `key={undefined}` — React sees that as duplicate keys too.

**Resolution:**
Changed `setCurrentChat` to assign the messages array instead of pushing into it:

```js
// Before — appends, causes duplicates
state.chats[chatId].messages.push(...messages);

// After — replaces, always clean
state.chats[chatId].messages = action.payload.messages;
```

---

### Bug: Follow-up messages crash the app (`null._id`)

**Where:** Backend `chat.controller.js` → Frontend `useChat.js`

For follow-up messages, the backend correctly skips creating a new chat. But that means `chat` in the response is `null`. On the frontend, the code tries `chat._id || chatId` — but `null._id` crashes JavaScript instantly. The `||` fallback never gets a chance to run.

```js
chat._id || chatId     // 💥 crashes if chat is null
chat?._id || chatId    // ✅ safely returns undefined, then falls through to chatId
```

**Key lesson:** `null.anything` crashes (TypeError). Optional chaining (`?.`) protects you: `null?.anything` just gives you `undefined`.
