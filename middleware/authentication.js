import jwt from 'jsonwebtoken'
import User from '../model/userModel.js';
import ErrorHandler from './errorhandler.js';

export const isAuthenticated = async(req,res,next) =>{

  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader); // Bearer token

  const token = authHeader.split(' ')[1];
  jwt.verify(
      token,
      process.env.accessToken_KEY,
      (err, decoded) => {
          if (err) return res.sendStatus(403); //invalid token
          req.user = decoded.UserInfo.email;
          req.roles = decoded.UserInfo.role;
          console.log(req?.roles)
          next();
      }
  );
//  try {
//         const {refreshToken} = req.cookies;
//         if(!refreshToken)
//         return res.status(404).json({
//          success : false,
//          message : 'login first',
    
//     });
    
    
    
//     const decodedToken  = jwt.verify(refreshToken, process.env.refreshToken_KEY)   
         
//     const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
//     if(!user) {
//       throw new ErrorHandler(401, 'User not valid' ) 
//     }
    
//     req.user = user 
//       next()
      
//  } catch (error) {
//      throw new ErrorHandler('401', error?.message || 'User not valid')
//  }
     
}



