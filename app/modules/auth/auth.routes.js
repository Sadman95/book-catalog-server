const router = require("express").Router()
const authController = require("./auth.controller")

router
    .post("/signup", authController.signUpController)
    .post("/login", authController.loginController)



module.exports = router