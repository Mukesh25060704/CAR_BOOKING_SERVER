const controller=require("../controller/userController")
const express=require('express')
const validatetoken = require("../middleware/validatetokenhandler")
const user_router=express.Router()

user_router.post("/create",controller.create)
user_router.post("/login",controller.Login)
user_router.get("/userprofile",validatetoken,controller.userprofile)
user_router.put('/updateuser',validatetoken,controller.userupdate)
module.exports=user_router
