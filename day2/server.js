const express = require('express');
const app = express();
const PORT = 8000;  


// --- CUSTOM MIDDLEWARE ---
// A logger that runs on every single request
const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // CRITICAL: If you don't call next(), the request will hang forever!
  next(); 
};

app.use(express.json());
app.use(requestLogger);

let users = [
    {id: 1, name: "ekas"},
    {id: 2, name: "UD"},
    {id: 3, name: "temple"},
]

app.get("/", (req, res) => {
    res.status(200).json({message: "Welcome to my dashboard!"});
});

// Get all users
app.get("/users", (req, res)=> {
    res.status(200).json({data: users})
})

// Get user by id
app.get("/users/:id", (req, res)=> {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) { 
        return res.status(404).json({error: "User not found"});
    }
    res.status(200).json({user: user});
});

// Create new user
app.post("/users", (req, res)=> {
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({error: "Name is required"});
    }
    const newUser = {
        id: users.length + 1,
        name: name
    }
    users.push(newUser);
    res.status(201).json({message: "User created successfully", user: newUser});
})

// Delete user by id
app.delete("/users/:id", (req, res)=> {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({error: "User not found"});
    }
    users = users.filter((user) => user.id !== id);
    res.status(200).json({message: "User deleted successfully"});
});

// Update user by id
app.put("/users/:id", (req, res)=> {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user){
        res.status(404).json({error: "User not found"});
    }
    const {name} = req.body;
    if(!name){
        res.status(400).json({error: "Name is required"});
    }
    user.name = name;
    res.status(200).json({message: "User updated successfully", user: user});
});

// Place this AFTER all your routes
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the red error to the console for the dev
  
  res.status(500).json({ 
    success: false, 
    error: "A fatal server error occurred." 
  });
});

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})