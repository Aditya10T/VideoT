const mongoose=require('mongoose')

const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:false,
    },
    public_id:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:true,  
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,  
    },
    categories:{
        type:Array,
        
    },
},{timestamps:true})

module.exports=mongoose.model("Post",PostSchema)