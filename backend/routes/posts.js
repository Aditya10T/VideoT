const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const verifyToken = require("../verifyToken");
const cloudinary = require('cloudinary');

//CREATE
router.post("/create", verifyToken, async (req, res) => {
  try {
    const{title,desc,username,userId,categories} = req.body;
    const fil = req.files.file;
    // console.log(fil)
  
    if(!title || !username || !desc || !userId){
      return res.status(400).json({
        message:"Please provide all the required fields"
      })
    }

    const result = await cloudinary.v2.uploader.upload(fil.tempFilePath, {
      resource_type : "auto",
      folder: "Images",
    });
    const newPost = new Post({
      title,
      desc,
      url:result.secure_url,
      public_id:result.public_id,
      username,
      userId,
      categories
    });
    // console.log(newPost);
    // console.log(req.body)
    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:"Internal Server Error"
    });
  }
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({
      message:"Internal Server Error"
    });
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted!");
  } catch (err) {
    res.status(500).json({
      message:"Internal Server Error"
    });
  }
});

//GET POST DETAILS
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('userId');
    if(!post){
      return res.status(404).json({
        message:"Post doesn't exist"
      })
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({
      message:"Internal Server Error"
    });
  }
});

//GET USER POSTS
router.get("/user/:userId",verifyToken, async (req, res) => {
  try {
    const search = req.query.search || "";
    const posts = await Post.find({$and : [{ userId: req.params.userId },{title:{$regex:search,$options:"i"}}]});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message:"Internal Server Error"
    });
  }
});

module.exports = router;
