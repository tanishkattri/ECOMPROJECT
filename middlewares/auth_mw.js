const user_model = require("../models/user.model")
const jwt = require('jsonwebtoken')
const secretKey = require("../configs/auth.config")

// creating widdleware that checks if the req body is proper and correct

const verifySignUpBody = async (req, res, next)=>{
  try{
    //check for name
    if(!req.body.name){
      return res.status(400).send({
        message : "Failed! as name not present"
      })
    }
    //check for email
    if(!req.body.email){
      return res.status(400).send({
        message : "Failed! as email not present"
      })
    }
    //check for userId
    if(!req.body.userId){
      return res.status(400).send({
        message : "Failed! as userId not present"
      })
    }
    //check for same userId is already there
    const user = await user_model.findOne({userId : req.body.userId})
    if(user){
      return res.status(400).send({
        message : "Failed! as userId is similar to another user Id"
      })
    }


  }catch(err){
    console.log("error while validating the request object", err)
    res.status(500).send({
      message: "error while validating the req body"
    })
  }
}


const verifySignInBody = async (req, res, next)=>{
  if(!req.body.userId){
    return res.status(400).send({
      message : "Input user Id"
    })
  }

  if(!req.body.password){
    return res.status(400).send({
      message : "Please enter password"
    })
  }

  next()
}

const verifyToken = (req, res, next)=>{
  // check if token is present in header
  const token = req.headers['x-axis-token']
  if(!token){
    return res.status(403).send({
      message : "you should first log in : UnAuthorized"
    })
  }

  //check if it is valid token
  jwt.verify(token,secretKey.secret, async (err, decoded)=>{
    if(err){
      return res.status(401).send({
        message: "Unauthorized"
      })
    }
    const user = await user_model.findOne({userId : decoded.id})
    if(!user){
      return res.status(400).send({
        message : "The user of this token doesn't exist"
      })
    }
     // move to next step
     req.user = user
    next()
  })
}


const isAdmin = (req,res,next)=>{
  const user = req.user
  if(user && user.userType == "Admin"){
    next()
  }else{
    res.status(403).send({
      message : "Onle Admin user are allowed to access this "
    })
  }
}



module.exports = {
  verifySignUp : verifySignUpBody,
  verifySignIn : verifySignInBody,
  verifyToken : verifyToken,
  isAdmin : isAdmin
}