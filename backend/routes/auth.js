const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username,email,company, password } = req.body;

    if(!username || !email || !company || !password){
      return res.status(400).json({
        message:"Please fill all the required fields"
      })
    }
    
    // existing username
    const existingUsername = await User.findOne({username});
    if(existingUsername){
      return res.status(400).json({
        message:"Username already exists",
      })
    }

    // existing Email
    const existingEmail = await User.findOne({email});
    if(existingEmail){
      return res.status(403).json({
        message:"User already exists with this Email",
      })
    }

    const passwordLength = password.length;
    if(passwordLength<8){
      return res.status(400).json({
        message:"Password length must be >=8",
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = new User({ username, email,company,password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({
      message:"Internal Server Error"
    });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message:"Invalid Credentials",
      });
    }
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json({
        message:"Invalid Credentials",
      });
    }
    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.SECRET,
      {expiresIn: "3d" }
    );
    const { password, ...info } = user._doc;
    res.cookie("token", token,{maxAge:24*60*60*1000}).status(200).json(info);
  } catch (err) {
    res.status(500).json({
      message:"Internal Server Error"
    });
  }
});

//LOGOUT
router.get("/logout", async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User logged out successfully!");
  } catch (err) {
    res.status(500).json({
      message:"Internal Server Error"
    });
  }
});

//REFETCH USER
router.get("/refetch", (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(data);
  });
});

module.exports = router;
