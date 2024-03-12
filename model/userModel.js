import mongoose from "mongoose";

const userSchema = mongoose.Schema({
     name : String,
     email: {
          type: String,
          unique : true,
     },
     password : {
          type : String,
          select : false,
     }

},{ timeStamps : true })

const User = mongoose.model('User', userSchema)

export default User