const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  name:{
    type: String,
    require: true
  },
  userId: {
    type : String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    lowercase: true,
    minLength: 10,
    unique: true
  },
  userType:{
    type: String,
    required: true,
    default: "Customer",
    enum: ["Customer", "Admin"]
  }

}, {timestamps:true, versionKey:false})


module.exports = mongoose.model("user", userSchema)

