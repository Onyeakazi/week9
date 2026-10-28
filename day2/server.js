const express = require("express");
const app = express();

const requestLogger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}

app.use(requestLogger);
app.use(express.json());

let users = [
    {id: 1, name: "peter"},
    {id: 2, name: "mary"},
    {id: 3, name: "john"}
]

app.get("/", (req, res)=> {
    res.status(200).json({message: "Welcome to my home page"});
});

app.get("/users", (req, res)=> {
    res.status(200).json({message: "Users list", data: users})
});

app.get("/users/:id", (req, res)=> {
    let id = req.params.id;
    const user = users.find(user => user.id == id);
    res.status(200).json({data: user});
});

app.post("/users", (req, res)=> {
    const {name} = req.body;
    const user = {
        id: users.length + 1,
        name: name
    };

    users.push(user);
    res.status(201).json({message: "User created successsfully!"});
});

app.put("/users/:id", (req, res)=> {
    let id = req.params.id;
    const user = users.find(user => user.id == id);

    if(!user){
        return res.status(404).json({Message: "User not found!"});
    } 

    const {name} = req.body;
    user.name = name;

    res.status(200).json({message: "User updated!"});
});

app.delete("/users/:id", (req, res)=> {
    const id = req.params.id;
    const user = users.find(user => user.id == id);

    if(!user){
        return res.status(404).json({Message: "User not found!"});
    } 

    users = users.filter(user => user.id !== Number(id));
    res.status(200).json({message: "User deleted!"});
})

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the red error to the console for the dev
  
  res.status(500).json({ 
    success: false, 
    error: "A fatal server error occurred." 
  });
});

app.listen(4000, ()=> {
    console.log("Server running on port 4000");
})