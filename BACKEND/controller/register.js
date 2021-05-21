const mongoose=require('mongoose')
const model=require('../model/register')
const list=mongoose.model(model.modelname)
function adduser(obj)
{
 const newuser=new list(obj)
 return newuser.save()
}
function findwithemail(email)
{
  return list.findOne({email:email});
}
function addtocart(email,dish)
{

  return list.findOne({email:email}).exec().then((user)=>{
     user.cart.push(dish);
     return user.save();
   })
}
function addtomenu(email,dish)
{

  return list.findOne({email:email}).exec().then((user)=>{
     user.menu.push(dish);
     return user.save();
   })
}
function removefromcart(email,id)
{
  console.log('hiiii')
  return list.findOne({email:email}).exec().then((user)=>{
    for(let i=0;i<user.cart.length;i++)
    {
      if(user.cart[i]._id==id)
      {
        console.log(user.cart[i]);
        user.cart.splice(i,1);
        return user.save();
      }
    }
  })
}
function addaddress(email,address)
{
  
  return list.findOne({email:email}).exec().then((user)=>{
  
    user.address.push(address);
    return user.save();
  })
}
module.exports={adduser,findwithemail,addtocart,addtomenu,removefromcart,addaddress}