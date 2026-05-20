const musicModel=require("../models/music.model")
const albumModel=require("../models/music.album")
const { uploadFile }=require("../services/storage.service")
const jwt=require("jsonwebtoken");
async function createMusic(req,res) {
const { title }=req.body
const file=req.file
const result=await uploadFile(file.buffer.toString('base64'))

const music= await musicModel.create({
    uri:result.url,
    title,
    artist:req.user.id
})
res.status(201).json({
    id:music._id,
    uri:music.uri,
    title:music.title,
    artist:music.artist

})
}

async function createalbum(req,res) {
    
        const { title,musics }=req.body
       
        const album= await albumModel.create({
            title,
            music:musics,
            artist:req.user.id,
            
        })
        res.status(201).json({
            message:"music album created succefully",
            album:{
            id:album._id,
            title:album.title,
            musics:album.music,
            artist:album.artist,  
            }
        })

    }
async function getAllmusic(req,res) {
    const musics=await musicModel.find()
    res.status(200).json({
        message:"succefully fetched",
        music:musics
    })  
}
async function getAllalbums(req,res) {
    const albums=await albumModel.find().select("title,artist").populate("artist","username email")
    res.status(200).json({
        message:"fetched succefully",
        albums:albums
    })
    
}
async function getAllalbumsbyid(req,res) {
    console.log(req.params)
console.log(req.params._id)
    const albumid=req.params.albumid
    const album=await albumModel.findById(albumid).populate("artist","username email").populate("music")
    res.status(200).json({
        message:'fetched succefully',
        album:album
    })
    
}

module.exports={createMusic,createalbum,getAllmusic,getAllalbums,getAllalbumsbyid};