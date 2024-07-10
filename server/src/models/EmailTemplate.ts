import mongoose from "mongoose";

export interface EmailTemplateProps {
  name: string;
  subject: string;
  body: string;
}

const EmailTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

export default mongoose.model<EmailTemplateProps>(
  "EmailTemplate",
  EmailTemplateSchema
);
