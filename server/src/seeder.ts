import dotenv from "dotenv";
import { connectDB } from "./config/database";
import EmailTemplate from "./models/EmailTemplate";

dotenv.config();
connectDB();

const seedEmailTemplates = async () => {
  const templates = [
    {
      name: "Welcome",
      subject: "Welcome to My services",
      body: "Hello ,\n\nWelcome to My services!\n\nBest regards,\nTeam",
    },
    {
      name: "Password Reset",
      subject: "Reset Your Password",
      body: "Hello ,\n\nClick the link below to reset your password:\n{{resetLink}}\n\nBest regards,\nTeam",
    },
    {
      name: "Newsletter",
      subject: "Our Latest News",
      body: "Hello ,\n\nHere is our latest newsletter.\n\nBest regards,\nTeam",
    },
  ];

  try {
    await EmailTemplate.deleteMany({});
    await EmailTemplate.insertMany(templates);
    console.log("Email templates seeded successfully");
  } catch (err) {
    console.error(err.message);
  } finally {
    process.exit();
  }
};

seedEmailTemplates();
