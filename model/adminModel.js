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

const Admin = mongoose.model('Admin', userSchema)

export default Admin