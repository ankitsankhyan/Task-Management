const User = require('../Model/user');
const jwt = require('jsonwebtoken');

exports.isAuth = async (req, res, next) => {
    try{
        const token = req.headers?.authorization;
        if(!token){
          return res.status(401).json({
            error: "No token provided"
          })
        }
        token = token.split(" ")[1];
         
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);
          const user = await User.findById(decoded.id);
          if(!user){
            return res.status(401).json({
              error: "User not found"
            })
          }
    }catch(err){
        return res.status(500).json({
            error: err.message
        })
    }
  

};