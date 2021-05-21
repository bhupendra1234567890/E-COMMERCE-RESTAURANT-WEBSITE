const passport=require('passport')
const mongoose=require('mongoose')
const model=mongoose.model(require('../model/register').modelname)
const LocalStrategy=require('passport-local').Strategy


const field={usernameField:'email'}
passport.use(new LocalStrategy(field,(email,password,done)=>{
  model.findOne({email:email}).exec().then((user)=>{
    
    if(!user||user.password!==password)
    {
      
      done(null,false);
    }
    else
    {
    done(null,user);}
  })
}))
passport.serializeUser((user,done)=>{
  done(null,user._id);
})
passport.deserializeUser((id,done)=>{
  model.findById(id).exec().then((user)=>{
    done(null,user);
  })
})