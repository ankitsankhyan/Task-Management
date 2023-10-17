const User = require('../Model/user');
const nodemailer = require('nodemailer');
const Tasks = require('../Model/Task');
const date = require('date-and-time')
const generateMailTransporter =()=>{
  return  nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.Nodemailer_user,
            pass: process.env.Nodemailer_pass
          }
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
             
             message += '<li>' +  tasks[0].title + '\n Due Date is ' + date.format(tasks[0].dueDate, 'MM:DD:YYYY ') + ' <br> Due time is ' + date.format(tasks[0].dueDate, 'DD:MM') + '</li>';

        }
        message += '</ul>'
      
    }

    let transport = generateMailTransporter();
   transport.sendMail({
            from: 'ankitsankhyan04@gmail.com',
            to: 'bcs_2021013@iiitm.ac.in',
            subject: "Pending Tasks",
            html: `<h1>Hi ${users[i].name}</h1><br> ${message}</p>`
        }, (err, info) => {
            if (err) {
                console.log('error is there');
                return;
            }
            console.log('info is', info);
        });

   
   
      

    }
}

module.exports = {
    generateMailTransporter,Notification
}