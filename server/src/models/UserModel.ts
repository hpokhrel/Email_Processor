import mongoose, { Document } from "mongoose";

export interface userProps extends Document {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    verificationToken: string;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: true,
  },
});

export default mongoose.model<userProps>("User", UserSchema);
