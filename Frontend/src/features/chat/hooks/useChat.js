import { initialiseSocketConnection } from "../services/chat.socket";
import { useDispatch } from "react-redux";
import {
  setChats,
  createNewChat,
  setCurrentChatId,
  addNewMessageToChat,
  setCurrentChat,
  setLoading,
  setError,
} from "../chat.slice";
import {
  sendChatMessage,
  getChats,
  getChatMessages,
} from "../services/chat.api";

// HOOKS layer, calling the API layer
// going to connect frontend with backend with the help of Socket.IO

// useChat is the middleman.
// calls the API, gets data back, then tells Redux what to store.
// Redux stores it. The UI reads it.
export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendChatMessage({ message, chatId }) {
    console.log("chatId received from the ChatPage:", chatId);

    try {
      dispatch(setLoading(true));
      const data = await sendChatMessage({ message, chatId });

      console.log(
        "data received from backend inside useChat - handleSendChatMessage function",
        data,
      );
      console.log("chatId received from the server", chatId);
      const { chat, aiMessage } = data;

      // create new chat

      // chat._id is a new chat id coming from the server for a newly created chat
      // chatId already exists on the frontend, for an existing chat
      // If the incoming chatId was null (first message), create the new Redux chat logic
      if (!chatId)
        dispatch(
          createNewChat({
            chatId: chat._id,
            title: chat.title,
          }),
        );

      // add user's message to newly created chat
      dispatch(
        addNewMessageToChat({
          chatId: chat?._id || chatId,
          content: message,
          role: "user",
        }),
      );

      // add ai's message to chat
      dispatch(
        addNewMessageToChat({
          chatId: chat?._id || chatId,
          content: aiMessage.content,
          role: aiMessage.role,
        }),
      );

      // marks it as the open conversation
      dispatch(setCurrentChatId(chat?._id || chatId));
    } catch (error) {
      console.error(error);
      dispatch(
        setError(error.response?.data?.message || "Something went wrong"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetChats() {
    dispatch(setLoading(true));

    try {
      const data = await getChats();
      const { chats } = data; // chats is an array of chat objects
      dispatch(setChats({ chats }));
    } catch (error) {
      console.error(error.message);
      dispatch(
        setError(
          error?.response?.data?.message ||
            "Something went wrong fetching data",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function fetchChatMessages(chatId) {
    dispatch(setLoading(true));
    try {
      const data = await getChatMessages({ chatId });
      const { messages } = data; // messages is an array of message obj
      dispatch(setCurrentChat({ messages, chatId }));
    } catch (error) {
      console.error(error.message);
      dispatch(
        setError(
          error.response.data.message ||
            "something went wrong fetching chat messages",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    initialiseSocketConnection,
    handleSendChatMessage,
    handleGetChats,
    fetchChatMessages,
  };
};
