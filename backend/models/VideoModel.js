const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique:true,
        trim: true,
        required:true
    },
    userId: {
         type:String,
         required:true
    },
    title:{
        type:String,
        required:true
    },
    url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('MyVideos', VideoSchema)