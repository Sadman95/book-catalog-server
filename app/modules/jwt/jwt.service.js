const jwt = require('jsonwebtoken')
const config = require('../../../config/index')

class JwtService{
    constructor(){};

    generateToken(payload){
        return jwt.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn
        })
    }

    async verifyToken(token){
        const decoded = await jwt.verify(token);
        return decoded;
    }
}

const JWT = new JwtService()

module.exports = JWT


