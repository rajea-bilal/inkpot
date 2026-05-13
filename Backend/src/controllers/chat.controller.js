import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

// -user - title ---> chatModel
// -chat - content - role; ---> messageModel

// FLOW:

// 1. user message frontend --> backend
// 2. Generate title : server sends user message --> LLM model to generate title
// 3. Create Chat in database: server takes chat title and creates a chat inside the DB with user and title
// 4. Save User message inside DB (messages)
// 5. Get All messages from chat
// 6. Generate AI Response: Send all the messages in a chat to LLM model to generate response
// 7. Save AI response inside DB

// user sends a follow-up message + chat it belonged to
// we extract the logged-in user id from req.user
// first check: if chatId exists, means theres already a chat + title, so we dont recreate them
// save the follow-up message inside the message collection
// look inside the databause and pull up all the messages inside the existing chat via chatId

// user sends just a message with no chatId, means its a brand new chat
// if chatId doesnt exist, its a brand new chat so it'll generate a chatTitle and and create a chat inside the db
// save user message inside db

export async function handleChatRequest(req, res) {
  const { message, chatId } = req.body; // message we receive from the user, would feed this to the LLM

  const user = req.user;
  console.log("logged in user inside chat controller", user.id);

  console.log("chatId received from the frontend:", chatId);

  let chatTitle = null;
  let chat = null;
  if (!chatId) {
    chatTitle = await generateChatTitle(message);
    chat = await chatModel.create({
      user: user.id,
      title: chatTitle,
    });
  }

  const userMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: message,
    role: "user",
  });
  // finding all the messages belonging to a particular chat
  // so we can send all the previous messages to AI as part of context
  const messages = await messageModel.find({ chat: chatId || chat._id });
  console.log("messages - from the existing chat", messages);

  const resultFromAI = await generateResponse(messages);

  const aiMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: resultFromAI,
    role: "ai",
  });

  res.status(200).json({
    chatTitle,
    chat,
    aiMessage,
  });
}

export async function getChats(req, res) {
  const user = req.user;
  const chats = await chatModel.find({ user: user.id });

  console.log("chats recieved in the getChats", chats);
  res.status(200).json({
    message: "Chat received for the logged-in user",
    chats,
  });
}

// find the chat first using both chatId AND user id
// dont want to return chats of userA to userB if they stole the chatId only
// want to establish ownership first, thats why find the chat using both chatId and user id
export async function getMessages(req, res) {
  const { chatId } = req.params;
  const user = req.user;

  const chat = await chatModel.findOne({ _id: chatId, user: user.id });

  if (!chat) {
    return res.status().json({
      message: "Chat not found",
    });
  }

  const messages = await messageModel.find({ chat: chatId });

  res.status(200).json({
    message: "Chat messages found",
    messages,
  });
}

export async function deleteChat(req, res) {
  const user = req.user;
  const chatId = req.params;

  // delete chat using user id + chat id
  const chat = await chatModel.findOneAndDelete({
    user: user.id,
    _id: chatId,
  });

  // delete all messages pertaining to the deleted chat
  const deletedMessages = await messageModel.findMany({
    chat: chatId,
  });

  if (!chat) {
    return res.status(400).json({
      message: "Chat not found",
    });
  }
  res.status(200).json({
    message: "chat deleted successfully",
    chat,
  });
}
