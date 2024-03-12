export const errorHandler = (err,req,res,next)=>{
    err.message =  err.message || 'Internal Server Error'
   err.statusCode =  err.statusCode || 500

    return res.status(err.statusCode).json({
        message : err.message
    })
}


class ErrorHandler extends Error{
    constructor(statusCode,message){
        super(message)
        this.statusCode = statusCode
    }
}

export default ErrorHandler