import { Request, Response } from "express";
import EmailLog from "../models/EmailLog";

export const EmailLogs = async (req: Request, res: Response) => {
  try {
    const logs = await EmailLog.find();
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
