const express=require('express')
const router=express.Router()
const controller=require('../controller/register')
router.get('/',(req,res)=>{
  controller.findwithemail(req.user.email).then((user)=>{
    res.send(user);
  })
})
module.exports={router}