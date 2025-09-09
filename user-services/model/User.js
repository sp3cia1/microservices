const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "First name must be at least 2 characters long"],
    maxlength: [20, "First name must be at most 20 characters long"],
    trim: true
  },
  lastName:{
    type:String,
    required: [true, "Last name is required"],
    minlength: [2, "Last name must be at least 2 characters long"],
    maxlength: [20, "Last name must be at most 20 characters long"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    maxlength: [100, "Password must be at most 100 characters long"],
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.pre("save", async function(next){
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch(e){
    console.error("Error hashing password ", e)
    next(e)
  }
})

userSchema.methods.comparePassword = async function(givenPassword){
  try{
    return await bcrypt.compare(givenPassword, this.password)
  } catch(e){
    console.error('Error comparing password:', error);
    throw error;
  }
}

const User = mongoose.model('User', userSchema)
module.exports = User