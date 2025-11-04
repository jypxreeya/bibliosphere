import mongoose from "mongoose";

const borrowedBookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  borrowedDate: { type: Date, default: Date.now },
  dueDate: { 
    type: Date,
    default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days later
  },
  userEmail: { type: String, required: true },
});

const BorrowedBook = mongoose.model("BorrowedBook", borrowedBookSchema);
export default BorrowedBook;
