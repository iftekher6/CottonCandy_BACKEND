import {app} from "../backend/app.js";
import connectDB from "../backend/config/mongoose.js";
import cloudinary from 'cloudinary'

connectDB()

cloudinary.v2.config({
    secure: true,
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

const port = process.env.PORT 

app.listen(port, ()=>{
    console.log(`Server started at ${port}`)
})
