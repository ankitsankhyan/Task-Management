const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },

    email:{
        type: String,
        required:true
    },

    password:{
        type: String,
        required:true
    }},
    {
        timestamps:true
    }

)

const User = mongoose.model('User', user);
module.exports = User;