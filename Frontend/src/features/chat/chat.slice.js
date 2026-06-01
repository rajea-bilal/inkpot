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
  // what does the UI need to display and track?
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null,
  },
  // functions that change Redux state.
  reducers: {
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;

      state.chats[chatId] = {
        title,
        chatId,
        messages: [], // Initialize messages array here!
      };
    },
    // Send a message
    addNewMessageToChat: (state, action) => {
      const { chatId, content, role } = action.payload;

      state.chats[chatId]?.messages?.push({ content, role });
    },
    // Track which conversation is open
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    // Load all conversations
    setChats: (state, action) => {
      const { chats } = action.payload; // chats is array of chat objects being sent by useChat
      // Current format:
      // [  { _id: "abc123", title: "Chat 1" },
      //    { _id: "abc123", title: "Chat 1" }
      // ]

      // Redux expects:
      // {
      // "abc123": { _id: "abc123", title: "Chat 1", messages: [] },
      // "def456": { _id: "def456", title: "Chat 2", messages: [] }
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
    //Open one conversation and load its messages
    setCurrentChat: (state, action) => {
      const { chatId, messages } = action.payload;
      state.chats[chatId].messages = action.payload.messages;
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
