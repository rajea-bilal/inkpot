import mongoose from "mongoose";

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Server connected to MongoDB");
}

export default connectDB;
