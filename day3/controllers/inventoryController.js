// Mock Database (Stored in RAM. Will reset if server restarts!)
let inventory = [
  { id: 1, name: "MacBook Pro", stock: 15 },
  { id: 2, name: "Logitech Mouse", stock: 45 }
];

// @desc    Get all inventory items
// @route   GET /api/inventory
const getAllItems = (req, res) => {
  res.status(200).json({ success: true, count: inventory.length, data: inventory });
};

// @desc    Create a new inventory item
// @route   POST /api/inventory
const createItem = (req, res) => {
  const { name, stock } = req.body;

  // Validation Check: Prevent bad data from entering the database
  if (!name || !stock) {
    return res.status(400).json({ 
      success: false, 
      error: "Please provide both 'name' and 'stock' fields in your JSON body." 
    });
  }

  const newItem = {
    id: Math.floor(Math.random() * 10000), // Generate random ID
    name: name,
    stock: stock
  };

  inventory.push(newItem);
  res.status(201).json({ success: true, data: newItem });
};

// @desc    Delete an item by ID
// @route   DELETE /api/inventory/:id
const deleteItem = (req, res) => {
  const itemId = parseInt(req.params.id);
  
  // Find if item exists
  const exists = inventory.find(item => item.id === itemId);
  if (!exists) {
    return res.status(404).json({ success: false, error: "Item ID not found." });
  }
  
  // Filter out the deleted item
  inventory = inventory.filter(item => item.id !== itemId);
  
  res.status(200).json({ success: true, message: `Item ${itemId} deleted successfully.` });
};

module.exports = {
  getAllItems,
  createItem,
  deleteItem
};