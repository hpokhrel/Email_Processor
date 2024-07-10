import { Request, Response } from "express";
import EmailTemplate, { EmailTemplateProps } from "../models/EmailTemplate";
import emailQueue from "../emailQueueJobs/emailqueue";

export const fetchTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await EmailTemplate.find();
    res.json(templates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const bulkEmailTemplate = async (req: Request, res: Response) => {
  try {
    const { templateId, emails } = req.body as {
      templateId: string;
      emails: string[][];
    };
    const template = await EmailTemplate.findById(templateId);
    if (!template) {
      return res.status(404).json({ msg: "Template not found" });
    }

    emails.forEach(([email, ...variables]) => {
      const variableObj: Record<string, string> = {};
      variables.forEach((value, index) => {
        variableObj[`var${index + 1}`] = value;
      });
      emailQueue.add({ template, email, variables: variableObj });
    });

    res.status(200).send("Bulk email request submitted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
