import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
   name : String,
   price : Number,
   description : String,
   image : String,
},{
  timeStamps : true,
})

const Product = mongoose.model('Product', ProductSchema)

export default Product
