let tasks = [
  { id: 1, name: "Read a book", completed: true },
  { id: 2, name: "build my portfolio", completed: false}
];


const getTask = (req, res) => {
    res.status(200).json({success: true, data: tasks});
}

const createTask = (req, res) => {
    try{
        const {name, completed} = req.body();

        // Validation Check: Prevent bad data from entering the database
        if (!name || !completed) {
            return res.status(400).json({ 
                success: false, 
                error: "Please provide both 'name' and 'completed' fields in your JSON body." 
            });
        }

        const task = {
            id: tasks.length + 1,
            name: name,
            completed: completed
        };

        tasks.push(task);
        res.status(201).json({success: true, message: "Task created!"});
    }catch(err){
        res.status(400).json({success: false, err: err.message});
    }
}


const deleteTask = (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const task = tasks.find(task => task.id === id);

        if(!task){
            res.status(404).json({success: false, message: "Task not found"});
        }

        tasks = task.filter(task => task.id !== id);
        res.status(201).json({success: true, message: "Task deleted!"});
    }catch(err){
        res.status(400).json({success: false, err: err.message});
    }
}

module.exports = {
    createTask, getTask, deleteTask
}