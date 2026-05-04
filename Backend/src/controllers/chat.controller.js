import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

// -user - title ---> chatModel
// -chat - content - role; ---> messageModel

// FLOW:
// user sends a follow-up message + chat it belonged to
// we extract the logged-in user id from req.user
// first check: if chatId exists, means theres already a chat + title, so we dont recreate them
// save the follow-up message inside the message collection
// look inside the databause and pull up all the messages inside the existing chat via chatId

// user sends just a message with no chatId, means its a brand new chat
// if chatId doesnt exist, its a brand new chat so it'll generate a chatTitle and and create a chat inside the db
// save user message inside db

export async function handleChatRequest(req, res) {
  const { message, chat: chatId } = req.body; // message we receive from the user, would feed this to the LLM

  const user = req.user;
  console.log("logged in user inside chat controller", user.id);

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
    chat: chatId,
    content: message,
    role: "user",
  });
  // finding all the messages belonging to a particular chat
  // so we can send all the previous messages to AI as part of context
  const messages = await messageModel.find({ chat: chatId });
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
