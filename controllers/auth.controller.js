const bcrypt = require('bcryptjs')
const user_model = require("../models/user.model")
const jsonwebtoken = require('jsonwebtoken')
const secret = require("../configs/auth.config")
// logic to register a user

exports.signup = async (req,res)=>{
  //1st read req
  const request_body = req.body
  //2 insert the data in the mongodb database
  const userObj = {
    name : request_body.name,
    userId : request_body.userId,
    email: request_body.email,
    userType: request_body.userType,
    password : bcrypt.hashSync(request_body.password,8)
  }

  try{
    const user_created = await user_model.create(userObj)

    const res_obj = {
      name : user_created.name,
      userId : user_created.userId,
      email : user_created.email,
      userType : user_created.userType,
      createdAt : user_created.createdAt,
      updatedAt : user_created.updatedAt 
    }

    res.status(201).send(res_obj)


  }catch(err){
    console.log("Error while registering", err)
    res.status(500).send({
      message : "Some error happen while storing the user"
    })
  }
  //3 return the response back to user
}


exports.signIn = async (req,res)=>{
  // check if user id is present in system
  const user = await user_model.findOne({userId : req.body.userId})
  if(user == null){
    return res.status(400).send({
      message : "Can't find user with this user id"
    })
  }
  //check for password is correct
  const isPasswordValid = bcrypt.compare(req.body.password, user.password) //here first one should be normal string
  if(!isPasswordValid){
    return res.status(401).send({
      message : "Incorrect Password"
    })
  }

  // using jwt we will create the acess token with a given TTL and return
  const token  = jsonwebtoken.sign({id: user.userId}, secret.secret, {expiresIn : 120})

  res.status(200).send({
    name : user.name,
    userId : user.userId,
    email : user.email,
    userType : user.userType,
    accessToken : token
  })

}