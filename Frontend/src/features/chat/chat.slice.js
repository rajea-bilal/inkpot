// import createSlice from redux
// create a chatSlice
// name - chat
// initial state: chat Array, initially empty object
// reducers

// currentChatId - null
// isLoading: false,
// error: null
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setChat: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setChat, setCurrentChatId, setLoading, setError } =
  chatSlice.actions;
export default chatSlice.reducer;
