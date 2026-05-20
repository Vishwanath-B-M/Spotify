const jwt=require("jsonwebtoken")
async function authmiddle(req,res,next){
const token=req.cookies.token 
if(!token){
    return res.status(401).json({
        message:"unathorized access"
    })
}
try{
    const decoded=jwt.verify(token,process.env.jwturl)
    if(decoded.role!=="artist"){
        return res.status(403).json({
            message:"unathorized access"
        })
    }
    req.user=decoded;
    next();
}catch(err){
    console.log(err)
    return res.status(409).json({
        message:'unathorized access'
    })
}
}
async function Access(req,res,next) {
    const token=req.cookies.token
    if(!token){
        return res.status(403).json({
            message:"you dont have the access"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.jwturl)
        if(decoded.role!=="user"&&decoded.role!=="artist"){
            return res.status(409).json({
                message:"you cant access the code"
            })
        }
        next()

    }catch(err){
        console.log(err)
        return res.status(401).json({
            message:"you dont have the access"
        })
    }
}
module.exports={authmiddle,Access};



