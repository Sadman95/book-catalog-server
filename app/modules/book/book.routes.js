const router = require("express").Router()
const booksController = require("./book.controller")
const {verifyAuth} = require("../auth/auth.middleware")

router
    .get("/:id", booksController.getBookByIdController)
    .patch("/:id", verifyAuth, booksController.updateBookController)
    .delete("/:id", verifyAuth, booksController.deleteBookController)
    .patch("/:id/reviews", verifyAuth , booksController.postReviewController)
    .get("/", booksController.getBooksController)
    .post("/", verifyAuth, booksController.createBookController)



module.exports = router