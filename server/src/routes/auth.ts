import express from "express";
import {
  loginUser,
  registerUser,
  verifyToken,
} from "../controllers/userController";

const authRoute = express.Router();

authRoute.post("/register", registerUser);
authRoute.get("/verify/:token", verifyToken);
authRoute.post("/login", loginUser);

export default authRoute;
