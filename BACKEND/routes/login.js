const express=require('express')
const router=express.Router()
const passport=require('passport')
const controller=require('../controller/register')
const path=require('path')
router.use(express.static(path.join(__dirname,'../../FRONTEND/login')))
router.get('/',isnotauthenticated,(req,res)=>{
  res.sendFile(path.join(__dirname,'../../FRONTEND/login/index.html'))
})
router.post('/',function(req, res, next) {
  
   passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.send('NO')}
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send('YES')
    });
  })(req, res, next);

});
function isnotauthenticated(req,res,next)
{
  if(req.isAuthenticated())
  {
    return res.redirect('/ecommerce/home');
  }
  else
  next();
}

module.exports={router}