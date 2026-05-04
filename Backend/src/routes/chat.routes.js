import { Router } from "express";
import { handleChatRequest } from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/message", authUser, handleChatRequest);
export default chatRouter;
