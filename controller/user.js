const User = require('../Model/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports.userSignup =async (req, res) => {
  try{
    const {name, email, password} = req.body;
    const user = await User.find({email});
    console.log(user);
    if(user.length > 0){
      res.status(409).json({
        message: "User already exists"
      })
    }
    const newUser = await User.create({name, email, password});
    res.status(200).json({
      message: "Successfully created the user", 
     
    })
  }catch(err){
  return  res.status(500).json({
      message: err.message
    })
  }

}


module.exports.login = async (req, res) =>{
    try{
        const {email, password} = req.body;
        const userLogin = await User.findOne({email});
        if(!userLogin){
      return  res.status(404).json({
            message: "User not found"
        })
        }
        const isMatch = await bcrypt.compare(password, userLogin.password);
        if(!isMatch){
       return res.status(400).json({
            message: "Invalid credentials"
        })
        }
        const token = jwt.sign({id: userLogin._id}, process.env.SECRET_KEY, {expiresIn: "10days"});
       return  res.status(200).json({
        message: "User logged in successfully",
        data: userLogin,
        token
        })
    }catch(err){
        res.status(500).json({
        message: err.message
        })
    }
}