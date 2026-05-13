import { Router } from "express";
import {
  deleteChat,
  getChats,
  getMessages,
  handleChatRequest,
} from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/message", authUser, handleChatRequest);
chatRouter.get("/:chatId/messages", authUser, getMessages);
chatRouter.get("/", authUser, getChats);

chatRouter.delete("/delete/:chatId", authUser, deleteChat);
export default chatRouter;
