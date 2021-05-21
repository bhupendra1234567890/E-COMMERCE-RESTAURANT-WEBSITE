const mongoose=require('mongoose')
const modelname='adress'
const modelschema=new mongoose.Schema({
  address:{
    type:String,
    require:true,
    
  },
  city:{
    type:String,
    require:true

  },
  country:{
    type:String,
    require:true
  },
  postalcode:{
    type:'number',
    require:true
  }
})
mongoose.model(modelname,modelschema)
module.exports={modelname,modelschema}