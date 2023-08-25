const router = require("express").Router()
const booksController = require("./book.controller")

router
    .get("/:id", booksController.getBookByIdController)
    .patch("/:id", booksController.updateBookController)
    .delete("/:id", booksController.deleteBookController)
    .get("/", booksController.getBooksController)
    .post("/", booksController.createBookController)



module.exports = router