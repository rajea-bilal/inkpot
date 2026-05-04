// Socket.IO lets your frontend and backend stay connected in real time.
// Frontend connects to backend
// Backend keeps the connection open
// They can send messages to each other anytime
import { Server } from "socket.io";

let io; // other files may need to access socket.io instance later

export function initSocket(httpServer) {
  // create a new socket io server and connect it to my backend serber
  io = new Server(httpServer, {
    cors: {
      // allow the frontend at link below, connect to this backend
      origin: "http://localhost:5173",
      credentials: true, // allow cookies/auth details to be sent with socket conn.
    },
  });

  console.log("Socket.IO server is running");
  // listen out for a user connecting
  // socket = one connected user
  io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);
  });
}

// this function lets other backend files access socketIO server
// we can use this function to send live updates to the frontend
export function getIO() {
  if (!io) {
    throw new Error("Socket.io is not initialised");
  }

  return io;
}
