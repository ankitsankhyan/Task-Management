const date = require('date-and-time');
const mongoose = require('mongoose');
const User = require('./user.js');
const task = new mongoose.Schema({
   title:{
       type: String,
       required:true
   },
   description:{
       type: String,
       required:true
   },
    status:{
         type:String,
         enum:["unitiated","inprogress","completed"],
         default:"unitiated"
         
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    dueDate:{
        type:Date,
        default: new Date()
    },
    timestamp:{
        type:Date,
        default: new Date()
    }
});

const Task = mongoose.model('Task', task);
module.exports = Task;