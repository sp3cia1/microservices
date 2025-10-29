const User = require("../model/User")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../utils/config")

const createToken = (user) => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    }, JWT_SECRET, { expiresIn: '1d' });
};
//JWT library makes a small JSON object: { "alg": "HS256", "typ": "JWT" }
//Then it Base64URL encodes it
//it then takes your data: {id: user._id, email:user.email, role:user.email}
//it Base64URL encodes it aswell to get <base64(header)> + "." + <base64(payload)>
//it then generates a signature by using HMACSHA256("header.payload", "mySecretKey")
//we get back the token <header>.<payload>.<signature>


const registerUser = async (req, res) => {
  try{
    const {firstName, lastName, email, password, role} = req.body
    const userExists = await User.findOne({email})
    if(userExists){
      return res.status(400).json({message: "User with this email already exists"})
    }
    const newUser = new User({firstName, lastName, email, password, role})
    await newUser.save()
    return res.status(201).json({message: "Succesfuly created user: ", firstName, lastName, email, role })
  } catch(e){
    console.error("error registring user: ", e)
    return res.status(500).json({message:"error creating user"})
  }
}

const loginUser = async (req, res) => {
  try{
    const {email, password}  = req.body;
    if(!email || !password){
      return res.status(400).json({message: "need both email and password"})
    }
    const user = await User.findOne({email})
    if(!user){
      return res.status(401).json({message: "user with this email not found"})
    }
    const validPassword =  await user.comparePassword(password)
    if(!validPassword){
      return res.status(401).json({message: "password incorrect"})
    }

    const token = createToken(user);
      res.status(200).json({
        status: "success",
        data: {
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            },
            token
        }
    });

  } catch(e){
    console.error("error logging in: ", e)
    return res.status(500).json({message: "error logging in user"})
  }
}

module.exports = {loginUser, registerUser}