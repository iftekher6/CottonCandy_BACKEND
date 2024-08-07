export const verifyRoles = (...allowedRoles) => {
    return (req,res,next)=>{
       
        if(!req.roles) return res.status(401).json('No role');
        
        const roles = [...allowedRoles]
        console.log('roles:' ,roles) 
        console.log('req.roles' ,req.roles) 

        if(roles.includes(req?.roles)){
            next()
        }else {
            res.status(401).json('no role')
        }

       
    }

}