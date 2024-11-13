//this will be the starting file of the project
const express = require("express")
const mongoose = require("mongoose")
const serverConfig = require("./configs/server.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")
const app = express()

// connection of mongodb
const db_config = require("./configs/db.config")

mongoose.connect(db_config.DB_URL)
const db = mongoose.connection

async function init(){
  try{let user = await user_model.findOne({userId : "Admin"})

  if(user){
    console.log("Admin is already present")
    return
  }}catch(err){
    console.log(err)
  }

  try{
    user = await user_model.create({
      name : "Tanishk",
      userId : "Admin",
      email : "attritanishk@gmail.com",
      userType : "Admin",
      password : bcrypt.hashSync("Tani@121",8)
    })

    console.log("Admin created as", user)
  }catch(err){
    console.log("error while creating admin" , err)
  }
}

db.on("error", ()=>{
  console.log("eroor took place")
})

db.once("open", ()=>{
  console.log("Connected to mongodb")
  init()
})







app.listen(serverConfig.PORT, ()=>{
  console.log("Server Started at port num : ", serverConfig.PORT)
})

app.use(express.json())


//stic the route to server
require("./routes/auth.route")(app)
require("./routes/category.route")(app)
