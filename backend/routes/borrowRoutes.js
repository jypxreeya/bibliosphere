import express from "express";
import { db } from "../firebase.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/borrow", async (req, res) => {
  try {
    const { title, author, userEmail } = req.body;

    // due date = 15 days after today
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15);

    const borrowData = {
      title,
      author,
      userEmail,
      dueDate: dueDate.toISOString(),
      borrowedAt: new Date().toISOString()
    };

    await db.collection("borrowed_books").add(borrowData);

    // send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Book Borrowed: ${title}`,
      text: `You have borrowed "${title}" by ${author}. Please return it before ${dueDate.toDateString()}.`,
    });

    res.status(200).json({ message: "Book added and email sent successfully" });
  } catch (error) {
    console.error("Borrow error:", error);
    res.status(500).json({ message: "Failed to add book" });
  }
});

export default router;
