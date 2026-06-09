const userRoutes = require("./routes/userRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");
const User = require("./models/User");

// Load .env variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Smart Finance Manager Backend Running");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});