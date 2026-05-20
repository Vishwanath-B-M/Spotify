const cookie=require("cookie-parser")
const express=require("express")
const autoRouter=require("./routers/auto.router")
const musicRouter=require("./routers/music.router")
const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookie())
app.use("/api/auto",autoRouter)
app.use("/api/music",musicRouter)
app.get("/",(req,res)=>{
   res.status(200).json({
    message:"hello world"
   })
})
module.exports=app;