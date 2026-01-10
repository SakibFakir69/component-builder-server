import mongoose, { Schema } from "mongoose";
import { IPrompt, ROLE } from "./prompt.interface";

const chatSchema = new Schema<IPrompt>({
  userId: { type: String, required: true },
  conversationId: { type: String, required: true },
  messages: [
    {
      role: { type: String, enum: Object.values(ROLE), required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
},{
  timestamps:true
});

export const Chat = mongoose.model("chat", chatSchema);
