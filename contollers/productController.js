import  Product  from "../model/productmodel.js"
import cloudinary from 'cloudinary'

export const getProduct = async (req,res)=>{
   try {
     const product = await Product.find()
      
     res.status(200).json(product)
     console.log(product)
   } catch (error) {
       console.log(error)
   }

}

export const createProduct = async (req, res) => {
    try {
      const { name, price, description } = req.body;
      // const image = req.file.filename; // Assuming the file is stored in the 'uploads' folder
  
    
      const result = await cloudinary.v2.uploader.upload(req.file.path)
  
      const newProduct = new Product({
        name,
        price,
        description,
        image: result.secure_url,
      });
    
      
        await newProduct.save();
        res.status(201).json({ message: 'Product saved successfully' });
      
       
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', error: error.message});
    }
    
  };

