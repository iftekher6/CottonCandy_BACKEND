import User from "../model/userModel.js";
import jwt, { decode } from 'jsonwebtoken'
import bycrypt from 'bcrypt'
import ErrorHandler from "../middleware/errorhandler.js";
import asyncHandler from 'express-async-handler'


export const getUser = async(req,res)=>{
 
    try {
    const user = await User.find({})
    res.status(200).json({user})
 } catch (error) {
    console.log(error)
 }

}
const generateAccessToken= async(userid)=>{
try {
       const user = await User.findById(userid)
       const accessToken =  user.generateAccessToken()
      
    
       return accessToken
} catch (error) {
     throw new Error(error)
}
}
const generateRefreshToken = async(userid)=>{
   try {
     const user = await User.findById(userid)
     const refreshToken =  user.generateRefreshToken()
        
     user.refreshToken = refreshToken
  
     await user.save({validateBeforeSave: false})
 
     return refreshToken
   } catch (error) {
     throw new Error(error)
   }
}
const options = {
    httpOnly: true, sameSite: 'None', secure: true
}
export const loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body
        // console.log(req.body)
        
        const user = await User.findOne({email}).select("+password")
        if(!user) throw new Error('User not valid')
        
        const roles = user.role
        const isMatched = bycrypt.compare( password, user.password )
        if(!isMatched) throw new Error('User not valid')

        // const token = jwt.sign({user : user._id, role: user.role}, process.env.JWTSECRET_KEY)
        const  accessToken = await generateAccessToken(user._id) 
        const refreshToken = await generateRefreshToken(user._id)

     
        res.status(201)
                .cookie("refreshToken", refreshToken, {maxAge: 24 * 60 * 60 * 1000},{httpOnly: true, sameSite: "lax", secure: false})
                .json({role: roles,accessToken :accessToken})
    
            } catch (error) {
             console.log(error)
      }

}

export const createUser = async(req,res) => {
    try {
        const { email , password , profession, interests,bio} = req.body
        const user = await User.findOne({ email })
        
        if(user) {
            res.status(404)
            throw new Error('User already registered')
        }
        
        const hashedPassword = await bycrypt.hash(password,10)
        const newUser = await User.create({
             email , password : hashedPassword ,profession,interests,bio
        })
    
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
    }
}

export const logout =(req,res)=>{
    res.status(200).cookie('refreshToken','',{expires : new Date(Date.now())}).json({
        success: true,
        user : req.user,
    });
}

export const refreshAccessToken =asyncHandler(async (req,res)=>{
    //first, we have to catch refreshtoken from the cookies
    //then, well main thing is to compare if the incoming refreshtoken extracted from the token matches with the refresh token saved in user model. 
    const incomingRefreshToken =  req.cookies.refreshToken
   
    
    
    if(!incomingRefreshToken) {
        throw new ErrorHandler(401, 'Unauthorized Request')
    }

   
      jwt.verify(incomingRefreshToken, process.env.refreshToken_KEY, async(err, decoded)=>{
    
        if(err) return res.status(401)
      const user = await User.findById(decoded._id)
      const userRole = user.role
      if(!user) throw new ErrorHandler(403, 'forbidden')
      if(incomingRefreshToken !== user.refreshToken) {
        throw new ErrorHandler(401, 'Refresh Token is expired or used')
       }
       const accessToken = await generateAccessToken(user._id)
       res.status(200)
    
       .json({role: userRole,accessToken , message :'AcesssToken Refreshed'})
    })
    
 
    // const user = await User.findById(decoded._id)
    
    // if(!user) throw new ErrorHandler('401', 'Invalid Refresh Token')
 
    // if(incomingRefreshToken !== user.refreshToken) {
    //  throw new ErrorHandler(401, 'Refresh Token is expired or used')
    // }
 
    // const {accessToken} = await generateAccessANDRefreshTokens(user._id)
    
    // res.status(200)
    
    //  .json({accessToken , message :'AcesssToken Refreshed'})
  



})


 