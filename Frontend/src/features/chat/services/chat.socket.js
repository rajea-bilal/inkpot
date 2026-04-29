import { io } from "socket.io-client";

// API layer - responsible for connecting to backend socketIO
// once connected, logs a message

export const initialiseSocketConnection = () => {
  const socket = io("http://localhost:3000", {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Connected to Socket.IO server");
  });
};
