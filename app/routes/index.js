const router = require("express").Router()
const booksRouter = require("../modules/book/book.routes")
const authRouter = require("../modules/auth/auth.routes")

const ROUTES = [
    {
        path: "/books",
        router: booksRouter
    },
    {
        path: "/auth",
        router: authRouter
    }
]

ROUTES.map((route) => router.use(route.path, route.router))

module.exports = router
