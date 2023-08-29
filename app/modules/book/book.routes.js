const router = require("express").Router()
const booksController = require("./book.controller")
const {verifyAuth} = require("../auth/auth.middleware")

router
    .get("/:id", booksController.getBookByIdController)
    .patch("/:id", booksController.updateBookController)
    .delete("/:id", booksController.deleteBookController)
    .patch("/:id/reviews", verifyAuth , booksController.postReviewController)
    .get("/", booksController.getBooksController)
    .post("/", booksController.createBookController)



module.exports = router