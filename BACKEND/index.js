const mongodb=require('mongodb')
const mongoose=require('mongoose')
const express=require('express')
const Session=require('express-session')
const controller=require('../BACKEND/controller/register')
const accountrouter=require('./routes/account')
const authentication=require('./authentication/passport')
const registerroute=require('./routes/register')
const loginroute=require('./routes/login')
const homeroute=require('./routes/home')
const config=require('./config')
const passport = require('passport')
const app=express()
app.use(Session({
  secret: "My Secret",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use((req,res,next)=>
 {
   res.setHeader('Access-control-Allow-Origin','*')
next()
})
app.get('/ecommerce/logout/',(req,res)=>{
  req.logOut();
  res.send();
})
app.use('/ecommerce/account/',accountrouter.router);
app.use('/ecommerce/register/',registerroute.router);
app.use('/ecommerce/login/',loginroute.router)
app.use('/ecommerce/home/',homeroute.router)
connectDB(config.DB_URL).then(connectserver(config.PORT))
function connectDB(DB_URL)
{
  mongoose.connection.on('error',(err)=>{
    console.error("found error")
    console.error(err)
  })
  mongoose.connection.once('open',()=>{
    console.log("database connected succesfully")
  })
  return mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true,
    useFindAndModify:false
  });
}
function connectserver(PORT)
{
  app.listen(PORT,(err)=>{
    if(err){console.error('could not connect the server')
    return;}
    console.log("server connected successfully at http://localhost:" +PORT)
  });
}
