const router = require('express').Router()
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken.middlewares")

const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} = require("../controllers/book.controoler")

router.route('/')
    .get(getAllBooks)
    .post(verifyTokenAndAdmin, createBook)

router.route('/:id')
    .get(getBookById)
    .put(verifyTokenAndAdmin, updateBook)
    .delete(verifyTokenAndAdmin, deleteBook)

module.exports = router
