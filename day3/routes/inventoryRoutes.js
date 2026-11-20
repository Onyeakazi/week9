const express = require('express');
const router = express.Router();
const {getAllInventory, getInventoryById, createInventory, updateInventory, deleteInventory} = require('../controllers/inventoryController');
const checkApiKey = require("../middleware/auth")

router.get('/', getAllInventory);
router.get('/:id', getInventoryById);
router.post('/', checkApiKey, createInventory);
router.put('/:id', checkApiKey, updateInventory);
router.delete('/:id', checkApiKey, deleteInventory);

module.exports = router;