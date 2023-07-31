const localErrorHandler = async(_req, _res, next) => {
    const error = new Error("Resource not found")
    error.status = 404
    next(error)
}

const globalErrorHandler = async(error, _req, res, _next) => {
    if(error.status){
        return res.status(error.status).json({message: error.message})
    }else{
        return res.status(500).json({message: "Something went wrong"})
    }
}

const errorHandler = {
    localErrorHandler,
    globalErrorHandler
}

module.exports = errorHandler