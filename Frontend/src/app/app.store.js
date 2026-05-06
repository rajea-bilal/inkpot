import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import chatReducer from "../features/chat/chat.slice";
// central place where all the global state lives
// created auth section and letting authReducer manage it
export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});
