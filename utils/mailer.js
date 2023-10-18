const User = require('../Model/user');
const nodemailer = require('nodemailer');
const Tasks = require('../Model/Task');
const date = require('date-and-time');
const kue = require('kue');
let queue = kue.createQueue();
const sendEmail =(target, message)=>{
  let transport =   nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.Nodemailer_user,
            pass: process.env.Nodemailer_pass
          }
    })
      console.log(target, message);
    transport.sendMail({
        from: 'ankitsankhyan04@gmail.com',
        to:target,
        subject: "Pending Tasks",
        html: message
    }, (err, info) => {
        if (err) {
            console.log('error is there');
            return;
        }
        console.log('info is', info);
    });


}
const executeJobs = ()=>{
    console.log('checking ....')
    queue.process('email', (job,done)=>{
         sendEmail(job.data.user, job.data.html);
         
         done();
    })
}

const Notification = async()=>{
    const users = await User.find();
 
    for(let i=0;i<users.length;i++){
       const tasks = await Tasks.find({userId:users[i]._id,
        $or: [{ dueDate: {$gt: new Date()}}, {status: "uninitiated"}, {status:"inprogress"}]
       });
    //    console.log(tasks[0]);
    //    console.log(date.format(tasks[0].dueDate, 'MM:DD:YYYY'));
    let message = '';
    if(tasks.length == 0){
       message = 'You have No Pending Task Today!'
    }else{
        message = '<h2>You have pending task as follows </h2> <ol>';
        for(let i = 0; i < tasks.length; i++){
             
             message += '<li>' +  tasks[0].title + '\n Due Date is ' + date.format(tasks[0].dueDate, 'MM:DD:YYYY ') + ' <br> Due time is ' + date.format(tasks[0].dueDate, 'HH:mm') + '</li>';

        }
        message += '</ul>'
      
    }
    let html =  `<h1>Hi ${users[i].name}</h1><br> ${message}</p>`

     let job = queue.create('email', {
        user: users[i].email,
        html
     }).attempts(2).backoff({delay:60000, type: 'fixed'}).save();
    // job.attempt(3).backoff({delay : 60000, type : 'fixed'});

    }
    console.log("executing jobs .....");
   executeJobs();
}

module.exports = {
    Notification
}