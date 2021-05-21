const mongodb=require('mongodb')
const modelname=('menu')
const mongoose=require('mongoose')
const modelschema=mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  image_url:{
    type:String,
    require:true
  },
  discription:{
    type:String,
    require:true
  },
  price:{
    type:String,
    require:true
  },
  type:{
    type:String,
    require:true
  }


})
mongoose.model(modelname,modelschema);
module.exports={modelname,modelschema}