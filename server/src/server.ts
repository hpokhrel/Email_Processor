import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/database";
import authRoute from "./routes/auth";
import emailRoute from "./routes/email";

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 4321;

// app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.use("/api/auth", authRoute);
app.use("/api/templates", emailRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
