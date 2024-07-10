import express from "express";
import authMiddleware from "../middlewares/auth";

import {
  bulkEmailTemplate,
  fetchTemplates,
} from "../controllers/emailController";
import { EmailLogs } from "../controllers/logs";

const emailRoute = express.Router();

emailRoute.get("/", authMiddleware, fetchTemplates);
emailRoute.post("/bulk-email", authMiddleware, bulkEmailTemplate);
emailRoute.get("/logs", EmailLogs);

export default emailRoute;
