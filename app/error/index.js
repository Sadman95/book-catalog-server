const ApiError = require('../../errors/ApiError')


const localErrorHandler = async(_req, _res, next) => {
    const error = new ApiError(404, "Resource not found")
    next(error)
}

const globalErrorHandler = async(error, _req, res, _next) => {
    if(error.statusCode){
        return res.status(error.statusCode).json({message: error.message})
    }else{
        return res.status(500).json({message: "Something went wrong"})
    }
}

const errorHandler = {
    localErrorHandler,
    globalErrorHandler
}

module.exports = errorHandler