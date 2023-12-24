const express = require("express");
const router = express.Router();
const VideoSchema = require("../models/VideoModel");
const cloudinary = require("cloudinary");
const verifyToken = require("../verifyToken");

router.post("/upload", async (req, res) => {
  try {
     const {name,email,userId,title} = req.body;
     const user = await VideoSchema.findOne({email});
     if(user){
      res.status(400).json({
        message:"You have already uploaded your video"
      })
     }
     const fil = req.files.file;
      const result = await cloudinary.v2.uploader.upload(fil.tempFilePath, {
        resource_type: "video",
      });

     const video = new VideoSchema({
        name,
        email,
        userId,
        title,
        url:result.secure_url,
        public_id:result.public_id
     })
     await video.save();
     return res.status(200).json({
        message: "Video Uploaded Successfully",
        video
     })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Video Upload failed",
      success: false,
      error,
    });
  }
});

router.get('/user/:userId',verifyToken, async(req,res)=>{
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 4;
    const search = req.query.search || "";

    const videos = await VideoSchema.find({ $and : [{userId : req.params.userId},{title:{$regex:search,$options:"i"}}]})
    .skip(page*limit)
    .limit(limit);
    
    const total = await VideoSchema.countDocuments({$and : [{userId : req.params.userId},{title:{$regex:search,$options:"i"}}]})

    res.status(200).json({
      message:"Got all videos",
      success:true,
      totalPages: Math.ceil(total/limit),
      page:page+1,
      limit,
      videos,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      message:"Could not get videos",
      success: "false",
      error,
    })
  }
});

router.delete("/:videoId",verifyToken,async(req,res)=>{
  try {
    const video = await VideoSchema.findOne({_id:req.params.videoId});
    if(!video){
      return res.status(404).json({
        message:"Video not found",
      })
    }
    await VideoSchema.findByIdAndDelete(req.params.videoId);
    res.status(200).json("Post has been deleted")
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:"Something went wrong"
    });
  }
})

module.exports = router
