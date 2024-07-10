import Queue from "bull";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { EmailTemplateProps } from "../models/EmailTemplate";
import EmailLog, { EmailLogProps } from "../models/EmailLog";

dotenv.config();

interface JobData {
  template: EmailTemplateProps;
  email: string;
  variables: Record<string, string>;
}

const emailQueue = new Queue<JobData>("email", {
  redis: { port: 6379, host: "127.0.0.1" },
});

emailQueue.process(async (job, done) => {
  const { template, email, variables } = job.data;

  let emailBody = template.body;
  Object.keys(variables).forEach((key) => {
    emailBody = emailBody.replace(`{{${key}}}`, variables[key]);
  });

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: parseInt(process.env.MAILTRAP_PORT!, 10),
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: '"Your Service" <no-reply@yourdomain.com>',
      to: email,
      subject: template.subject,
      text: emailBody,
    });
    console.log(`Email sent to ${email}`);
    await EmailLog.create({ email, status: "success" });
    done();
  } catch (error) {
    console.error(`Failed to send email to ${email}`, error);
    await EmailLog.create({ email, status: "failed", error: error.message });
    done(error);
  }
});

export default emailQueue;
