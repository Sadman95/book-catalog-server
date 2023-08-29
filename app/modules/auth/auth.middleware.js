const ApiError = require('../../../errors/ApiError')
const JwtService = require('../jwt/jwt.service')

const verifyAuth = async(req, res, next) => {
    let user = null;
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            throw new ApiError(404, 'Invalid access!')
        }else{
            user = await JwtService.verifyToken(token);
        }
        req.user = user;
        next();
    }catch (e) {
        next(e);
    }
}

module.exports = {
    verifyAuth
};