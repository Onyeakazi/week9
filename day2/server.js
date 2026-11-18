const express = require('express');
const app = express();

// --- BUILT-IN MIDDLEWARE ---
// Without this line, req.body will be UNDEFINED for POST requests!
app.use(express.json()); 

// --- CUSTOM MIDDLEWARE ---
// A logger that runs on every single request
const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // CRITICAL: If you don't call next(), the request will hang forever!
  next(); 
};
app.use(requestLogger);

let users = [
    {id: 1, name: "John Doe", email: "john@example.com"},
    {id: 2, name: "Jane Smith", email: "jane@example.com"},
    {id: 3, name: "Alice Johnson", email: "alice@example.com"}
]

let products = [
    {id: 1, name: "Product A", price: 10.99},
    {id: 2, name: "Product B", price: 19.99},
    {id: 3, name: "Product C", price: 5.99},
    {id: 4, name: "Product D", price: 15.49},
    {id: 5, name: "Product E", price: 25.00},
    {id: 6, name: "Product F", price: 7.99},
]

app.get("/", (req, res)=> {
    res.send("Hello World");
});

app.get("/about", (req, res)=> {
    res.send("About Page");
});

app.post("/contact", (req, res)=> {
    res.send("Contact Page");
});

app.get("/users", (req, res)=> {
    res.json(users);
});

// Add a new user
app.post("/users", (req, res)=> {
    const { name, email } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Get a user by ID
app.get("/users/:id", (req, res)=> {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send("User not found");
    }
});

// Update a user by ID
app.put("/users/:id", (req, res)=> {
    const userId = parseInt(req.params.id);
    const userExisting = users.find(u => u.id === userId);
    if (userExisting) {
        const { name, email } = req.body;
        userExisting.name = name || userExisting.name;
        userExisting.email = email || userExisting.email;
        res.json(userExisting);
    } else {
        res.status(404).send("User not found");
    }
});

// Delete a user by ID
app.delete("/users/:id", (req, res)=> {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        users = users.filter(u => u.id !== userId);
        res.status(200).send("User deleted");
    } else {
        res.status(404).send("User not found");
    }
});

app.get("/products/price", (req, res)=> {
    const minPrice = parseFloat(req.query.min);
    const maxPrice = parseFloat(req.query.max);
    
    const filteredProducts = products.filter(p => p.price >= minPrice && p.price <= maxPrice);
    res.json(filteredProducts);
});


// Place this AFTER all your routes
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the red error to the console for the dev
  
  res.status(500).json({ 
    success: false, 
    error: "A fatal server error occurred." 
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});