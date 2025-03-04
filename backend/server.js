require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(express.json()); // Parsing JSON
app.use(cors()); // Mengizinkan akses dari domain lain
app.use(morgan("dev")); // Loggin request

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
