import jwt from 'jsonwebtoken'

export const isAuthenticated = (req,res,next) =>{
    const {token} = req.cookies;
    if(!token)
    return res.status(404).json({
     success : false,
     message : 'login first',

});


    jwt.verify(token, process.env.JWTSECRET_KEY,(err, user)=>{
        if(err) throw new Error('Invalid User ')

        req.user = user
        next()   
     })

     
}
