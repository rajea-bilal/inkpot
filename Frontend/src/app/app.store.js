import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";

// central place where all the global state lives
// created auth section and letting authReducer manage it
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
