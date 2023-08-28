const catchAsyncHandler = require("../../../helpers/catch-async-handler")
const bookService = require("./book.service")
const sendCustomResponse = require("../../../helpers/send-custom-response")

//create book controller
const createBookController = catchAsyncHandler(async(req, res) => {
    const book = await bookService.createBookService(req.body)

    sendCustomResponse(res, {
        status: 201,
        success: true,
        message: "Book created successfully",
        data: book
    })
})

//get books controller
const getBooksController = catchAsyncHandler(async (req, res) => {
    const {searchTerm, ...filters} = req.query
    const result = await bookService.getBooksService(filters, searchTerm)
    sendCustomResponse(res, {
        status: 200,
        success: true,
        message: "Books retreived successfully",
        data: result.books,
        meta: {
            page: Number(result.page),
            limit: Number(result.limit),
            totalPages: Math.ceil(result.totalBooks / Number(result.limit)),
        }
    })

})

//get book controller
const getBookByIdController = catchAsyncHandler(async(req, res) => {
    const result = await bookService.getBookByIdService(req.params.id)

    sendCustomResponse(res, {
        status: 200,
        success: true,
        message: "Book retreived successfully",
        data: result,
    })
})

//update book controller
const updateBookController = catchAsyncHandler(async(req, res) => {
    const result = await bookService.updateBookService(req.params.id, req.body)
    sendCustomResponse(res, {
        status: 200,
        success: true,
        message: "Book updated successfully",
        data: result,
    })
})

//delete book controller
const deleteBookController = catchAsyncHandler(async(req, res) => {
    const result = await bookService.deleteBookService(req.params.id)
    sendCustomResponse(res, {
        status: 200,
        success: true,
        message: "Book deleted successfully",
        data: result,
    })
})

module.exports = {
    createBookController,
    getBooksController,
    getBookByIdController,
    updateBookController,
    deleteBookController
}