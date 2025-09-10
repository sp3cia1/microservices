const User = require("../model/User")
const { JWT_SECRET } = require("../utils/config")
const jwt = require('jsonwebtoken')


const protect = async(req, res, next) => {
  try{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
      return res.status(401).json({message: "token not found"})
    }
    const decoded = jwt.verify(token, JWT_SECRET)
    //since token = <header>.<payload>.<signature>
    //Recalculate the signature using the header + payload and the same secret key.
    //if the signature match then user is authentic
    //decode the base64 url and return it back
    const user = await User.findById(decoded.id)
    if(!user){
      return res.status(401).json({message: 'User not found'})
    }
    req.user = user
    next()
  } catch(e){
      console.error("error while authenticating user: ", e)
      return res.status(401).json({message: "Error while validating json"})
  }
}

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
      return res.status(401).json({
        message:"Access denied: you dont have permission"
      })
    }
    next()
  }
}

module.exports({protect, restrictTo})