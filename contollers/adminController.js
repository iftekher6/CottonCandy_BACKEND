import User from "../model/userModel.js";
import jwt from 'jsonwebtoken'
import bycrypt from 'bcrypt'
import Admin from "../model/adminModel.js";


// export const getUser = async(req,res)=>{
 
//     try {
//     const user = await User.find({})
//     res.status(200).json({user})
//  } catch (error) {
//     console.log(error)
//  }

// }
export const loginAdmin = async(req,res)=>{
    try {
        const {email, password} = req.body
        
        const admin = await Admin.findOne({email}).select("+password")
        if(!admin) throw new Error('Admin not valid')
         
        const isMatched = bycrypt.compare(password, admin.password)
        if(!isMatched) throw new Error('Admin not valid')

        const token = jwt.sign({admin : admin._id}, process.env.JWTSECRET_KEY)

    
        res.status(201).cookie("token", token, {expiresIn : '2m',
             httpOnly: true,
             sameSite : 'None'}).json({message : `welcome back ${admin.name}`})
    } catch (error) {
        console.log(error)
    }

}

export const createAdmin = async(req,res) => {
    try {
        const {email , password} = req.body
        const admin = await Admin.findOne({email})
        
        if(admin) {
            res.status(404)
            throw new Error('Admin already registered')
        }
        
        const hashedPassword = await bycrypt.hash(password,10)
        const newAdmin = await Admin.create({
             email , password : hashedPassword
        })
    
        res.status(201).json(newAdmin)
    } catch (error) {
        console.log(error)
    }
}

