const router = require("express").Router()
const booksRouter = require("../modules/book/book.routes")

router.use("/books", booksRouter)

module.exports = router
