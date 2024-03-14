import express from "express";
import {config} from 'dotenv'
// dotenv.config()
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import adminRoute from './routes/adminRoute.js'
import multer from 'multer'
import  path  from "path";
import {errorHandler} from './middleware/errorhandler.js'
import cookieParser from "cookie-parser";





export  const app = express()

config({
  path: '.env'
})

const allowedOrigins = 'https://candy-front-567l.vercel.app/'
app.use(cors({
  origin : (origin, callback) =>{
    if(!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    }else{
      callback(new Error('Not Allowed By CORS'))
    }
  },
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true,
}));

//multer setUP

const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
      cb(null, 'public/images')
    },
    filename : (req, file, cb) =>{
      cb(null, file.fieldname + "_" + Date.now()+ path.extname(file.originalname))
    }

  })

const upload = multer ({ storage : storage})

//Middlewares
// app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))
app.use('/api/v1/products', upload.single('image'), productRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/admin', adminRoute)


app.get('/',  (req, res )=> {
  res.send('Hello World!');
  console.log('hello')
  
});

//errorHandler
app.use(errorHandler)









