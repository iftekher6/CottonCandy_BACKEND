import User from "../model/userModel.js";
import jwt from 'jsonwebtoken'
import bycrypt from 'bcrypt'


export const getUser = async(req,res)=>{
 
    try {
    const user = await User.find({})
    res.status(200).json({user})
 } catch (error) {
    console.log(error)
 }

}
export const loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body
        
        const user = await User.findOne({email}).select("+password")
        if(!user) throw new Error('User not valid')
         
        const isMatched = bycrypt.compare(password,user.password)
        if(!isMatched) throw new Error('User not valid')

        const token = jwt.sign({user : user._id}, process.env.JWTSECRET_KEY)

    
        res.status(201).cookie("token", token, {expiresIn : '2m',
             httpOnly: true,
             sameSite : 'None'}).json({token,message : `welcome back ${user.name}`})
    } catch (error) {
        console.log(error)
    }

}

export const createUser = async(req,res) => {
    try {
        const {name, email , password} = req.body
        const user = await User.findOne({email})
        
        if(user) {
            res.status(404)
            throw new Error('User already registered')
        }
        
        const hashedPassword = await bycrypt.hash(password,10)
        const newUser = await User.create({
            name, email , password : hashedPassword
        })
    
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
    }
}

export const logout =(req,res)=>{
    res.status(200).cookie('token','',{expires : new Date(Date.now())}).json({
        success: true,
        user : req.user,
    });
}
