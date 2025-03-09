const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environtment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
app.use(cors()); // Mengaktifkan CORS agar bisa diakses backend
app.use(express.json()); // Middleware agar bisa membaca JSON dari request

// Routing dasar
app.get("/", (req, res) => {
  res.send("Task API is running...");
});

// Menentukan port server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

