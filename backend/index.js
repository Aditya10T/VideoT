const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const path=require("path")
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const videoRoute = require('./routes/video')
const cloudinary = require('cloudinary');
const fileupload = require('express-fileupload');

dotenv.config()
app.use(fileupload({ useTempFiles: true }));
//database
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully!")

    }
    catch(err){
        console.log(err)
    }
}

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API,
    api_secret:process.env.CLOUDINARY_SECRET,
});



//middlewares
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/video",videoRoute)
//serve static files
app.use('/public', express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    connectDB()
    console.log("app is running on port "+PORT)
})