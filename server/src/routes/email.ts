import express from "express";
import authMiddleware from "../middlewares/auth";

import {
  bulkEmailTemplate,
  fetchTemplates,
} from "../controllers/emailController";

const emailRoute = express.Router();

emailRoute.get("/", authMiddleware, fetchTemplates);

emailRoute.post("/bulk-email", authMiddleware, bulkEmailTemplate);

export default emailRoute;
