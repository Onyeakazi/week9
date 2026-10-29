// routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getAllItems, 
  createItem, 
  deleteItem 
} = require('../controllers/inventoryController');
const checkApiKey = require('../middleware/auth'); // Import route-specific middleware

// Define endpoints. Notice we don't write '/api/inventory' here 
// because it was already defined and prefixed inside server.js!

router.get('/', getAllItems);            // Triggered on GET /api/inventory
router.post('/', createItem);            // Triggered on POST /api/inventory

// We protect the DELETE route with checkApiKey middleware!
router.delete('/:id', checkApiKey, deleteItem);       // Triggered on DELETE /api/inventory/5

module.exports = router;