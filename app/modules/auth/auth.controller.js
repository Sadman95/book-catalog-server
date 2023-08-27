const catchAsyncHandler = require("../../../helpers/catch-async-handler")
const authService = require("./auth.service")
const sendCustomResponse = require("../../../helpers/send-custom-response")

const signUpController = catchAsyncHandler(async(req, res, next) => {
    const result = await authService.signupService(req.body);

    result ? sendCustomResponse(res, {
        success: true,
        status: 201,
        message: "Registration successful!",
        data: result
    }): next();
})
const loginController = catchAsyncHandler(async(req, res, next) => {
    const result = await authService.loginService(req.body);

    result ? sendCustomResponse(res, {
        success: true,
        status: 200,
        message: "Login successful!",
        data: result
    }): next();
})

module.exports = {
    signUpController,
    loginController
}