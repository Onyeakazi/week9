const express = require('express');
const inventoryRoutes = require("./routes/inventoryRoutes");
const logger = require("./middleware/logger");
const app = express();
const port = 3000;

// 1. Global Middleware
app.use(express.json()); // Allow JSON payloads
app.use(logger);         // Mount custom logger globally

// 2. Route Delegation (Mounting Routers)
// Any HTTP request starting with '/api/inventory' is forwarded to inventoryRoutes.js
app.use("/api/inventory", inventoryRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 3. Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "API Endpoint not found" });
});

// 4. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Server crashed!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});