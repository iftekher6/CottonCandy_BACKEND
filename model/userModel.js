import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema({
     name : String,
     email: {
          type: String,
          unique : true,
     },
     password : {
          type : String,
          select : false,
     },
     role: { type: String, enum: ['admin', 'user'], default: 'user' },
     
     refreshToken : {
          type : String
     },
     profession: {
          type: String,
          required: true,
        },
        interests: {
          type: [String],
        },
        bio: {
          type: String,
          maxlength: 50,
        },

},{ timeStamps : true })

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
       'UserInfo': {
     
          'email' : this.email,
          'role' : this.role
    }}, process.env.accessToken_KEY, {expiresIn: '2s'} )
}

userSchema.methods.generateRefreshToken = function(){
         return jwt.sign({_id : this._id, role : this.role }, process.env.refreshToken_KEY ,{expiresIn :'1d'})
}

const User = mongoose.model('User', userSchema)

export default User