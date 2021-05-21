const express=require('express')
const router=express.Router()
const controller=require('../controller/register')
const path=require('path');
const { chownSync } = require('fs');
let user;
router.get('/',isauthenticated,(req,res)=>{
  user=req.user;
  router.use(express.static(path.join(__dirname,'../../FRONTEND/home')))
  res.sendFile(path.join(__dirname,'../../FRONTEND/home/index.html'))
})
router.get('/menu',(req,res)=>{
 
  controller.findwithemail(user.email).then((data)=>{
    console.log(data);
      return res.json(data.menu);
  })
})
router.post('/menu',(req,res)=>{
  const obj={
    name:req.body.name,
    image_url:req.body.image_url,
    discription:req.body.discription,
    price:req.body.price,
    type:req.body.type
  }
  controller.addtomenu(user.email,req.body).then((data)=>{
    console.log(data);
     res.redirect('/ecommerce/home/menu');
  })
})
router.get('/cart',(req,res)=>{
 
  controller.findwithemail(user.email).then((data)=>{
    console.log(data);
      return res.json(data.cart);
  })
})

router.post('/cart',(req,res)=>{
  const obj={
    name:req.body.name,
    image_url:req.body.image_url,
    discription:req.body.discription,
    price:req.body.price,
    type:req.body.type
  }
  controller.addtocart(user.email,req.body).then((data)=>{
     res.redirect('/ecommerce/home/menu');
  })
})
router.delete('/cart/:id',(req,res)=>{
  console.log(req.params.id);
  controller.removefromcart(user.email,req.params.id).then((data)=>{
      res.redirect('/ecommerce/cart');
  })
})
router.get('/address',(req,res)=>{
 
  controller.findwithemail(user.email).then((data)=>{
    
      return res.json(data.address);
  })
})

router.post('/address',(req,res)=>{
  controller.addaddress(user.email,req.body).then((data)=>{
    res.redirect('/ecommerce/home/address');
  })
})
function isauthenticated(req,res,next)
{
  if(req.isAuthenticated())
  {
   next();
  }
  else
  {
    return res.redirect('/ecommerce/login')
  }
}
module.exports={router}