import mongoose from "mongoose";

export interface EmailLogProps {
  email: string;
  status: string;
  date: Date;
  error?: string;
}

const EmailLogSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  error: {
    type: String,
  },
});

export default mongoose.model<EmailLogProps>("EmailLog", EmailLogSchema);
