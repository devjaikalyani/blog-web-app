// Import necessary modules
const express = require("express");

// Create an Express app
const app = express();

// Basic route
app.get("/", (req, res) => {
  res.send("Hello from Vercel and Express.js!");
});

// You can add other routes as needed
app.get("/about", (req, res) => {
  res.send("About Page");
});

// Export the app for Vercel
module.exports = app;

