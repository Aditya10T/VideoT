const mongoose=require('mongoose')
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    company:{
       type:String,
       required:true
    },
    password:{
        type:String,
        required:true,
        
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},{timestamps:true})

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

// Generating Password Reset Token
UserSchema.methods.PasswordTokengen = function () {
   // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken; 
}

module.exports=mongoose.model("User",UserSchema)