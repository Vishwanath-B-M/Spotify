const mongoose=require("mongoose")
async function connectDb() {
    try{
        await mongoose.connect(process.env.mongooseurl)
        console.log("database connected successfully")
    }
    catch(err){
        console.log(err)
    }
    
}
module.exports=connectDb;