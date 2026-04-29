import { initialiseSocketConnection } from "../services/chat.socket";

// HOOKS layer, calling the API layer
// going to connect frontend with backend with the help of Socket.IO

export const useChat = () => {
  return { initialiseSocketConnection };
};
