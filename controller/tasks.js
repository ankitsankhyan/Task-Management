const Task = require('../Model/Task');
const date = require('date-and-time');
module.exports.createTask =async(req, res) =>{
    try{
        console.log(req.body);
        const {title, description,  timeString,dateString, userId} = req.body;
        const [hours, minutes] = timeString.split(":").map(Number);

        // Split the date string into day, month, and year
        const [day, month, year] = dateString.split("/").map(Number);
        
        // Create a new Date object
      
        const newDate = new Date(year, month - 1, day, hours, minutes);
        console.log(date.format(newDate, 'YYYY/MM/DD HH:mm:ss'));
        const task = new Task({
            title,
            description,
            dueDate:newDate,
            userId
        });
        await  task.save();
        res.status(200).json({
            message: "Task created successfully"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            error: error.message
        })
    }

   
}

module.exports.updateTask = async (req, res) =>{
  try{
     const id = req.params.id;
     console.log(id);
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
      await task.save();
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

        await Task.findByIdAndDelete(id);
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
        let task = await Task.findById(id);
        if(!task){
        return res.status(404).json({
            error: "Task not found"
        })
        }
       const possible = ["unitiated","inprogress","completed"];
         const {status} = req.body;
         task.status = possible[status];
         await task.save();
       return res.status(200).json({
            message: "Task status updated successfully"
        })

    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}