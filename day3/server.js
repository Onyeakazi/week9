const express = require("express");
const taskRoute = require("./routes/taskRoute");
const logger = require("./middleware/logger");
const app = express();


app.use(express.json());
app.use(logger);

app.use("/api/tasks", taskRoute);

// 3. Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "API Endpoint not found" });
});

// 4. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Server crashed!" });
});

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})