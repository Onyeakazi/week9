let inventory = [
    {id: 1, title: "biscuits", price: 150},
    {id: 2, title: "shoes", price: 200},
    {id: 3, title: "clothes", price: 170},
];

const getAllInventory = (req, res)=> {
    res.status(200).json({ success: true, count: inventory.length, data: inventory });
};

const getInventoryById = (req, res) => {
    const { id } = req.params;
    const item = inventory.find((item) => item.id === parseInt(id));
    if (!item) {
        return res.status(404).json({ success: false, error: "Item not found" });
    }
    res.status(200).json({ success: true, data: item });
}

const createInventory = (req, res) => {
    const { title, price } = req.body;
    if (!title || !price) {
        return res.status(400).json({ success: false, error: "Title and price are required" });
    }
    const newItem = {
        id: inventory.length + 1,
        title,
        price
    };
    inventory.push(newItem);
    res.status(201).json({ success: true, data: newItem });
};

const updateInventory = (req, res) => {
    const { id } = req.params;
    const { title, price } = req.body;
    const item = inventory.find((item) => item.id === parseInt(id));
    if (!item) {
        return res.status(404).json({ success: false, error: "Item not found" });
    }
    if (title) item.title = title;
    if (price) item.price = price;
    res.status(200).json({ success: true, data: item });
};
    
const deleteInventory = (req, res) => {
    const { id } = req.params;
    const item = inventory.find((item) => item.id === parseInt(id));
    if(!item){
        res.status(404).json({success: false, message: "Item not found"})
    }
    const deletedItem = inventory.filter((item) => item.id !== id);
    res.status(200).json({success: true, message: "Item deleted"});
}

module.exports = {
    getAllInventory, 
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory
}