const express=require('express')
const router=express.Router()
const controller=require('../controller/register')
const path=require('path')
router.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'../../FRONTEND/register/index.html'))
})
router.post('/',(req,res)=>{
  const obj={
    username:req.body.username,
    email:req.body.email,
    password:req.body.password,
    confirmpassword:req.body.confirmpassword,
    firstname:req.body.firstname,
    lastname:req.body.lastname
  }
  if(obj.password!==obj.confirmpassword)
  res.json("password not matching");
  else{
  controller.adduser(obj).then(()=>{
    res.send("yes")}
    ).catch(
      (err)=>{res.json("user already exsist")}
      )
}
})
module.exports={router}