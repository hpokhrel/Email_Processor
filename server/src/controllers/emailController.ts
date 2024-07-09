import { Request, Response } from "express";
import EmailTemplate from "../models/EmailTemplate";

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
      emails: string[];
    };

    // Queue logic will go here

    res.status(200).send("Bulk email request submitted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
