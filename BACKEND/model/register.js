const mongoose=require('mongoose')
const modelname="register"
const dishschema=require('./menu').modelschema;
const addressschema=require('./adress').modelschema
const modelschema=new mongoose.Schema({
   username:{
     type:String,
     require:true,
     unique:true
   },
   email:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String,
    require:true
  },
  confirmpassword:{
    type:String,
    require:true
  },
  firstname:{
    type:String,
    require:true
  },
  lastname:{
    type:String,
    require:true
  },
  cart:[dishschema],
  menu:[dishschema],
  address:[addressschema]
  }
)
mongoose.model(modelname,modelschema)
module.exports={modelname}