const express = require("express");
const router = express.Router();
const {createTask, getTask, deleteTask} = require("../controllers/taskController");
const checkAPI = require("../middleware/checkAPi")

router.get("/", getTask);
router.post("/", createTask);
router.delete("/:id", checkAPI, deleteTask);

module.exports = router;