const jwt=require("jsonwebtoken");
const userModel=require("../models/user.model")
const bcrypt=require("bcryptjs")

async function  register(req,res) {
    const { username,email,password,role='user' }=req.body
    const isuseralreadyexist=await userModel.findOne({
        $or:[{username},
            {email}
        ]
    })
    if(isuseralreadyexist){
        return res.status(409).json({
            message:'user is already exist'
        })
    }
    const hash=await bcrypt.hash(password,10)

    const user=await userModel.create({
        username,
        email,
        password:hash,
        role

    })
    const token=jwt.sign({
        id:user._id,
        role:user.role
    },process.env.jwturl)

    res.cookie("token",token)
    res.status(201).json({
        message:"created user succefully",
        user:{
            username:user.username,
            id:user.id,
            email:user.email

        }
    })

    
}
async function loginUser(req,res) {
    const { username,email,password }=req.body
   const user=await userModel.findOne({
    $or:[{username},{email}]   
   }) 
if(!user){
    return res.status(401).json({
        message:"inavalid credentials"
    })
};
const ispasswordisvalid=await bcrypt.compare(password,user.password)
if(!ispasswordisvalid){
    return res.status(409).json({
        message:"invalid credentials"
    })
}
const token=jwt.sign({
    id:user._id,
    role:user.role
},process.env.jwturl)
res.cookie("token",token)
res.status(201).json({
    message:"created",
    username:user.username,
    email:user.email,
    role:user.role
})
}
async function logoutUser(req,res) {
    res.clearCookie("token")
    res.status(201).json({
        message:"logout succefully"
    })    
}
module.exports={ register,loginUser,logoutUser };