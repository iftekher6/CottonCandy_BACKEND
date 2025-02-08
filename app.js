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
const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Credentials', true);
  }
  next();
}
// http://localhost:5173/
console.log(process.env.Allowed_origin)
const allowedOrigins = `${process.env.Allowed_origin}`
app.use(credentials)
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
  optionsSuccessStatus: 200,


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
// app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser())

app.use(express.static('public'))
app.use('/api/v1/products', upload.array('image'), productRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/admin', adminRoute)


app.get('/',  (req, res )=> {
  res.send('Hello World!');
  console.log('hello')
  
});

//errorHandler
app.use(errorHandler)









