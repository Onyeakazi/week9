// server.js
const express = require('express');
const inventoryRoutes = require('./routes/inventoryRoutes');
const logger = require('./middleware/logger'); // Import custom middleware

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Global Middleware
app.use(express.json()); // Allow JSON payloads
app.use(logger);         // Mount custom logger globally

// 2. Route Delegation (Mounting Routers)
// Any HTTP request starting with '/api/inventory' is forwarded to inventoryRoutes.js
app.use('/api/inventory', inventoryRoutes);

// 3. Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "API Endpoint not found" });
});

// 4. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Server crashed!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});