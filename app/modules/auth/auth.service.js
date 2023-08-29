const User = require('../user/user.model')
const JwtService = require('../jwt/jwt.service')
const ApiError = require("../../../errors/ApiError")

const signupService = async (payload) => {
    const newUser = new User({
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: payload.password,
        role: payload.role ?? 'user'
    });
    await newUser.save();
    const token = JwtService.generateToken({
        email: payload.email,
        username: `${payload.firstName} ${payload.lastName}`,
        role: payload.role ?? 'user'
    });

    const {password, ...rest} = newUser["_doc"]
    return {
        ...rest,
        token
    }
}
const loginService = async (payload) => {
    const user = new User();

    const exist = await user.isUserExists("email", payload.email)
    if(!exist) {
        throw new ApiError(404, "User doesn't exist")
    }
    const isMatchPassword = await user.isPasswordMatch(payload.password, exist.password);
    if(!isMatchPassword) {
        throw new ApiError(409, "Password doesn't match")
    }
    const token = JwtService.generateToken({
        email: payload.email,
        role: payload.role ?? 'user'
    });

    const {password, ...others} = exist;

    return {
        ...others,
        token
    }
}

module.exports = {
    signupService,
    loginService
}