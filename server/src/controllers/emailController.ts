import { Request, Response } from "express";
import EmailTemplate from "../models/EmailTemplate";
import EmailLog from "../models/EmailLog";
import { sendEmail } from "../utils/sendEmail";

interface BulkEmailRequestProps {
  templateId: string;
  emails: string[][];
}

export const fetchTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await EmailTemplate.find();
    res.json(templates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const bulkEmailTemplate = async (
  req: Request<{}, {}, BulkEmailRequestProps>,
  res: Response
) => {
  const { templateId, emails } = req.body;

  try {
    const template = await EmailTemplate.findById(templateId);
    if (!template) {
      return res.status(404).json({ msg: "Template not found" });
    }

    for (const emailRow of emails) {
      const email = emailRow[0];
      const variables = emailRow.slice(1);

      let emailBody = template.body;
      variables.forEach((value, index) => {
        emailBody = emailBody.replace(`{{var${index + 1}}}`, value);
      });

      try {
        await sendEmail(email, template.subject, emailBody);
        await EmailLog.create({ email, status: "Sent" });
      } catch (err) {
        console.error(`Failed to send email: ${email}`, err);
        await EmailLog.create({ email, status: "Failed", error: err.message });
      }
    }

    res.status(200).json({ msg: "Bulk emails sent successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
