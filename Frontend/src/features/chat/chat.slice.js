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
    // function that changes Redux state.
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;

      state.chats[chatId] = {
        title,
        chatId,
        messages: [], // Initialize messages array here!
      };
    },
    addNewMessageToChat: (state, action) => {
      const { chatId, content, role } = action.payload;

      state.chats[chatId]?.messages?.push({ content, role });
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setChats: (state, action) => {
      const { chats } = action.payload; // chats is array of chat objects
      // Current format:
      // [  { _id: "abc123", title: "Chat 1" },
      //    { _id: "abc123", title: "Chat 1" }
      // ]

      // Redux expects:
      // {
      // "abc123": { _id: "abc123", title: "Chat 1", messages: [] },
      //  "def456": { _id: "def456", title: "Chat 2", messages: [] }
      // }
      // run reduce function on chats array to store all chats in obj format with their chatIds as key

      state.chats = chats.reduce((obj, chat) => {
        obj[chat._id] = {
          ...chat,
          title: chat.title.replace(/"/g, ""),
          messages: [],
        };

        return obj;
      }, {});
    },
    setCurrentChat: (state, action) => {
      const { chatId, messages } = action.payload;
      state.chats[chatId].messages.push(...messages);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  createNewChat,
  addNewMessageToChat,
  setCurrentChatId,
  setChats,
  setCurrentChat,
  setLoading,
  setError,
} = chatSlice.actions;
export default chatSlice.reducer;
