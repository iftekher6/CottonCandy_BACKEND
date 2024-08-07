import mongoose from "mongoose";

const userSchema = mongoose.Schema({
     
     email: {
          type: String,
          unique : true,
          required : true
     },
     password : {
          type : String,
          select : false,
          required : true
          
     },
     role : {
          type: String,
          default: 'admin'
     }

},{ timeStamps : true })

const Admin = mongoose.model('Admin', userSchema)

export default Admin