const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/medicines", require("./routes/medicineRoutes"));

// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "Medicine Database API is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

module.exports = app;
