const mongoose=require("mongoose");

const user=mongoose.Schema({ 
    name:String,
    phone:Number,
    password:String
});

const model=mongoose.model("User",user);

module.exports=model;