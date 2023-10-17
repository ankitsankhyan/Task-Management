const Task = require('../Model/Task');

module.exports.createTask =async(req, res) =>{
    try{
        const {title, description,  dueDate} = req.body;
        const task = new Task({
            title,
            description,
            dueDate
        });
        task.save();
        res.status(200).json({
            message: "Task created successfully"
        })
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }

   
}

module.exports.updateTask = async (req, res) =>{
  try{
     const id = req.params.id;
     const task = await Task.findById(id);
        if(!task){
        return res.status(404).json({
            error: "Task not found"
        })
        }

        const {title, description, dueDate} = req.body;
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.save();
        res.status(200).json({
            message: "Task updated successfully"
        })
        
  }catch(error){
    res.status(500).json({
      error: error.message
    })
  }
}

module.exports.deleteTask = async (req, res) =>{
       try{
        const id = req.params.id;
        const task = await Task.findById(id);
        if(!task){
        return res.status(404).json({
            error: "Task not found"
        })
        }

        task.remove();
        res.status(200).json({
            message: "Task deleted successfully"
        })

       }catch(error){
        res.status(500).json({
            error: error.message  
        })
       }
}

module.exports.updateStatus = async (req, res) => {
    try{
        const id = req.params.id;
        const task = await Task.findById(id);
        if(!task){
        return res.status(404).json({
            error: "Task not found"
        })
        }
       const possible = ["unitiated","inprogress","completed"];
         const {status} = req.body;
         task.status = possible[status];
            task.save();
       return res.status(200).json({
            message: "Task status updated successfully"
        })

    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}