const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();
console.log("✅ .env loaded");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug log
console.log("✅ Middleware set up");

// API Routes
try {
  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/tasks", require("./routes/tasks"));
  console.log("✅ Routes registered");
} catch (err) {
  console.error("❌ Error loading routes:", err.message);
}

// Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
console.log("🌐 Attempting to connect to MongoDB...");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
