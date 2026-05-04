import "dotenv/config"; // dotenv simply grabs the contents of your .env file, attaches them to the process.env object in Node.js, and makes them available globally across your app without you ever having to hardcode them.
import app from "./src/app.js";
import http from "http";
import { initSocket } from "./src/sockets/server.socket.js";
import connectDB from "./src/config/database.js";
import { verifyTransporter } from "./src/services/mail.service.js";
// import { testAI } from "./src/services/ai.service.js";
const port = process.env.PORT;

// socket IO doesnt attach to the Express app directly,
// it attaches to the real HTTP server
// express is handling normal API req
//
const httpServer = http.createServer(app);

initSocket(httpServer);

connectDB();
// testAI();
httpServer.listen(port, async () => {
  console.log(`Server running on Port ${port}`);
  await verifyTransporter();
});
