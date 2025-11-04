import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import borrowRoutes from "./routes/borrowRoutes.js";
import authorRoutes from "./routes/authorRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/borrow", borrowRoutes);
app.use("/api/author", authorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
