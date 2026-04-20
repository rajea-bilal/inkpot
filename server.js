import "dotenv/config"; // dotenv simply grabs the contents of your .env file, attaches them to the process.env object in Node.js, and makes them available globally across your app without you ever having to hardcode them.
import app from "./src/app.js";
import connectDB from "./src/config/database.js";

const port = process.env.PORT;

connectDB();
app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
