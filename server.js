import {app} from "./app.js";
import connectDB from "./config/mongoose.js";
import cloudinary from 'cloudinary'

connectDB()

cloudinary.v2.config({
    secure: true,
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

const port = process.env.PORT | 8000

app.listen(port, ()=>{
    console.log(`Server running at ${port}`)
})
