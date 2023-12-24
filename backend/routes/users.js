const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Post = require("../models/Post");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const verifyToken = require("../verifyToken");

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("+password");
    if (req.body.oldPassword || req.body.newPassword) {
      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );
      if (!isPasswordMatched) {
        return res.status(400).json({
          message: "Old password is incorrect",
        });
      }
      const passwordLength = req.body.newPassword.length;
      if (passwordLength < 8) {
        return res.status(400).json({
          message: "Password length must be >=8",
        });
      }
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.newPassword, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:"Internal Server Error"
    });
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    res.status(200).json("User has been deleted!");
  } catch (err) {
    res.status(500).json({
      message:"Internal Server Error"
    });
  }
});

//GET USER
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not Found" });
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json({
      message:"Internal Server Error"
    });
  }
});

// Forgot Password
router.post("/password/forgot", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // Get ResetPassword Token
  const resetToken = user.PasswordTokengen();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://localhost:5173/reset-password/${resetToken}`;

  const message = `Your password reset token is  :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Your Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

//Reset Password
router.post("/password/reset/:token", async (req, res) => {
  try {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    //   console.log(resetPasswordToken);
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Reset password token is invalid or has expired",
      });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        message: "Password does not match",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // send token
    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...info } = user._doc;

    res
      .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 })
      .status(200)
      .json(info);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
