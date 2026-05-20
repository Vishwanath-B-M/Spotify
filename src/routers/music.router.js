const musicController=require("../controllers/music.controller")
const authRouter=require("../middleware/middleware")
const express=require('express')
const multer=require("multer")
const upload=multer({
    memory:multer.memoryStorage()
})
const router=express.Router();
router.post("/upload",authRouter.authmiddle,upload.single("music"), musicController.createMusic)
router.post("/create",authRouter.authmiddle,musicController.createalbum)
router.get("/",authRouter.Access,musicController.getAllmusic)
router.get("/album",authRouter.Access,musicController.getAllalbums)
router.get("/album/:albumid",authRouter.Access,musicController.getAllalbumsbyid)

module.exports=router;