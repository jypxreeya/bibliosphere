import express from "express";
import { db } from "../firebase.js";

import nodemailer from "nodemailer";

const router = express.Router();

// Email Transporter (Refined for Gmail)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("❌ Mail Server Error:", error);
  } else {
    console.log("✅ Mail Server is ready to send messages");
  }
});

// Request Book Reminder (Email)
router.post("/remind", async (req, res) => {
  const { email, bookTitle } = req.body;

  if (!email || !bookTitle) {
    return res.status(400).json({ message: "Email and Book Title are required" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `📖 Bibliosphere Reminder Set: ${bookTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #031427; color: #e9feff; border-radius: 10px;">
        <h2 style="color: #00f5ff;">Bibliosphere Academic Nexus</h2>
        <p>Hello Researcher,</p>
        <p>You have successfully set a reminder for the book: <strong>${bookTitle}</strong>.</p>
        <p>We will notify you immediately once this book is returned and becomes <strong>AVAILABLE</strong> in our archives.</p>
        <br/>
        <p style="font-size: 0.8rem; color: #94a3b8;">This is an automated message from the Bibliosphere Smart Library System.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Reminder set! Confirmation email sent." });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send reminder email" });
  }
});

// Search Books
router.get("/search", async (req, res) => {
  const { query, type } = req.query; // type: 'title', 'author', 'category'

  try {
    let booksRef = db.collection("books");
    let snapshot;

    if (query) {
      // Simple case-insensitive search (prefix match)
      // Note: Firestore doesn't support true partial text search out of the box
      // For better search, we would use Algolia or similar, but for now we'll do prefix match
      snapshot = await booksRef
        .where(type || "title", ">=", query)
        .where(type || "title", "<=", query + "\uf8ff")
        .get();
    } else {
      snapshot = await booksRef.get();
    }

    const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(books);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Failed to search books" });
  }
});

// Update Availability (RFID/Access Simulation)
router.patch("/status/:bookId", async (req, res) => {
  const { bookId } = req.params;
  const { available, accessStatus } = req.body;

  try {
    await db.collection("books").doc(bookId).update({
      available,
      accessStatus,
      updatedAt: new Date().toISOString()
    });
    res.json({ message: "Book status updated" });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Failed to update book status" });
  }
});

// Get Digital Copy
router.get("/digital/:bookId", async (req, res) => {
  const { bookId } = req.params;
  try {
    const doc = await db.collection("books").doc(bookId).get();
    if (!doc.exists) return res.status(404).json({ message: "Book not found" });
    
    const data = doc.data();
    if (!data.digitalCopyUrl) return res.status(404).json({ message: "Digital copy not available" });
    
    res.json({ url: data.digitalCopyUrl });
  } catch (error) {
    res.status(500).json({ message: "Error fetching digital copy" });
  }
});

export default router;
