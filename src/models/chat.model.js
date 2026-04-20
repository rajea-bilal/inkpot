import mongoose from "mongoose";

-user - title - createdAt - updatedAt;

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      default: "New Chat",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const chatModel = mongoose.model("chat", chatSchema);
export default chatModel;
