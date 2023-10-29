const mongoose=require('mongoose')
const userSchema= new mongoose.Schema({
    userid:Number,
    name:String,
    email:String,
    phonenumber:Number,
    age:Number,
    city:String,
    pincode:Number,
    address:String,
    password:String,
    
})
module.exports=mongoose.model("user",userSchema)