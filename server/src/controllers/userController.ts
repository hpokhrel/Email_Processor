import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { userProps } from "../models/UserModel";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { Request, Response } from "express";

interface loginProps {
  email: string;
  password: string;
}
interface registerProps {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (
  req: Request<{}, {}, registerProps>,
  res: Response
) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = uuidv4();

    user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    await user.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: '"Bulk Email Processor" <no-reply@bulkemailprocessor.com>',
      to: user.email,
      subject: "Email Verification",
      text: `Please verify your email by clicking the following link: http://localhost:5000/api/auth/verify/${verificationToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ msg: "User registered, verification email sent" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  console.log(`Verification request received for token: ${req.params.token}`);

  try {
    const user = await User.findOne({ verificationToken: req.params.token });

    if (!user) {
      console.log("Invalid token");
      return res.status(400).json({ msg: "Invalid token" });
    }

    user.isVerified = true;
    user.verificationToken = "";
    await user.save();

    console.log("Email verified");
    res.status(200).json({ msg: "Email verified" });
  } catch (err) {
    console.error("Error verifying email:", err.message);
    res.status(500).send("Server error");
  }
};

export const loginUser = async (
  req: Request<{}, {}, loginProps>,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ msg: "Please verify your email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
