const jwt = require('jsonwebtoken')
const config = require('../../../config/index')
const ApiError = require('../../../errors/ApiError')

class JwtService{
    constructor(){};

    generateToken(payload){
        return jwt.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn
        })
    }

    async verifyToken(token){
        const decoded = await jwt.decode(token);
        return decoded;
    }
}

const JWT = new JwtService()

module.exports = JWT


