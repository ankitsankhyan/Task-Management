const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const user = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },

    email:{
        type: String,
        required:true,
        unique:true
    },

    password:{
        type: String,
        required:true
    }},
    {
        timestamps:true
    }

)
user.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});
const User = mongoose.model('User', user);
module.exports = User;