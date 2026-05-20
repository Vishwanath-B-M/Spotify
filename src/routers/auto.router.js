const express=require("express")
const authcontroller=require("../controllers/auto.controller")
const router=express.Router();
const uservalidater=require("../middleware/validation.middleware")
router.post("/register",uservalidater.uservalidationrules,authcontroller.register)
router.post("/login",uservalidater.uservalidationrules,authcontroller.loginUser)
router.post("/logout",uservalidater.uservalidationrules,authcontroller.logoutUser)
module.exports=router;