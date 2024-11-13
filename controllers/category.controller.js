const mongoose = require('mongoose')
const category_model = require("../models/category.model")

// controller for creating the category
// for ecomm/api/v1/categories having name and description

exports.createNewCategory = async (req,res)=>{
  //read request

  //create category object
  const cat_data = {
    name : req.body.name,
    description : req.body.description
  }

  try{
    //insert in mongodb
    const category = await category_model.create(cat_data)
    return res.status(201).send(category)
  }catch(err){
    console.log("error while creating category", err)
    return res.status(500).send({
      message: "Error occurs"
    })
  }
  
  // response on completion
}