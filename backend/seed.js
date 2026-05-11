import { db } from "./firebase.js";

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic Literature",
    available: true,
    shelfLocation: "A-12",
    rowNumber: 3,
    accessStatus: "Public",
    rfidTag: "RFID-GATSBY-001",
    digitalCopyUrl: "https://example.com/gatsby.pdf",
    recommendationScore: 95
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    available: false,
    shelfLocation: "CS-01",
    rowNumber: 1,
    accessStatus: "Reserved",
    rfidTag: "RFID-CLEAN-002",
    digitalCopyUrl: "https://example.com/cleancode.pdf",
    recommendationScore: 98
  },
  {
    title: "Introduction to Algorithms",
    author: "Cormen, Leiserson, Rivest, Stein",
    category: "Computer Science",
    available: true,
    shelfLocation: "CS-05",
    rowNumber: 2,
    accessStatus: "Public",
    rfidTag: "RFID-ALGO-003",
    digitalCopyUrl: "https://example.com/algo.pdf",
    recommendationScore: 92
  }
];

const resources = [
  {
    title: "Data Structures Lecture 1",
    category: "lecture",
    url: "https://youtube.com/example1",
    author: "Dr. Smith"
  },
  {
    title: "AI Research Paper 2024",
    category: "paper",
    url: "https://arxiv.org/example2",
    author: "Prof. Johnson"
  },
  {
    title: "University Physics Question Paper 2023",
    category: "question_paper",
    url: "https://university.edu/physics2023",
    author: "Examination Dept"
  }
];

async function seed() {
  console.log("🌱 Seeding database...");
  
  // Seed Books
  for (const book of books) {
    await db.collection("books").add(book);
    console.log(`Added book: ${book.title}`);
  }

  // Seed Resources
  for (const resource of resources) {
    await db.collection("resources").add(resource);
    console.log(`Added resource: ${resource.title}`);
  }

  console.log("✅ Seeding complete!");
  process.exit();
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
