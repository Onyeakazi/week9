const express = require("express");
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
    {id: 1, name: "John", age: 30},
    {id: 2, name: "Peter", age: 35},
    {id: 3, name: "mary", age: 20},
]

app.get("/", (req, res)=> {
    res.status(200).json({success: true, message: "Welcome to home page"});
})

// All users
app.get("/users", (req, res)=> {
    res.status(200).json({success: true, data: users})
});

// Find by id
app.get("/users/:id", (req, res)=> {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    res.status(200).json({success: true, data: user});
});

// Create user
app.post("/users", (req, res)=> {
    const {name, age} = req.body;

    const user = {
        id: users.length + 1,
        name: name,
        age: age
    };
    users.push(user);
    res.status(201).json({success: true, message: "User created successfully"});
});

// Update user
app.put("/users/:id", (req, res)=> {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);

    const {name, age} = req.body;

    user.name = name || user.name;
    user.age = age || user.age;

    res.status(200).json({success: true, message: "user updated"});
});

// Delete user
app.delete("/users/:id", (req, res)=> {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);

    if(!user){
       return res.status(404).json({success: false, message: "User not found"});
    }

    users = users.filter(user => user.id !== id);
    res.status(200).json({success: true, message: "user deleted successfully!"});
});

// Place this AFTER all your routes
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the red error to the console for the dev
  
  res.status(500).json({ 
    success: false, 
    error: "A fatal server error occurred." 
  });
});

app.listen(3000, ()=> {
    console.log("Server runnning on port 3000")
})

