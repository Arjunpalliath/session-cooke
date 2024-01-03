const express=require("express");
const mongoose=require("mongoose");
const app=express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const sh=require("./src/users/index");
const connects=async() =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/session");
        console.log("connect db");
    }
    catch(e){
        console.log(e);
    }
};
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true,
}));

const isAuth = (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
connects();

app.post("/sign-up",async (req,res)=>{
    const response=await sh.createuser({...req.body});
    res.send(response);
});

app.post("/loging",async (req,res)=>{
    const user1=await sh.findbyPhone(req.body.phone);
    if(user1)
    {
    req.session.user = user1;
    res.cookie('user', user1.name);
    res.send(req.sessionID);
    } else {
    res.status(401).json({ message: 'Invalid credentials' });
    }
    
})

app.get('/inside', isAuth, (req, res) => {
    res.json({ message: 'Welcome', user: req.session.user });
  });

app.listen(3000,()=>{
    console.log("Server start at port number ",3000);
    
});