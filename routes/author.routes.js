const router = require('express').Router()
const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/author.controller')
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken.middlewares')

// /api/authors
router
    .route('/')
    .get(getAllAuthors)
    .post(verifyTokenAndAdmin, createAuthor)

// /api/authors/:id
router
    .route('/:id')
    .get(getAuthorById)
    .put(verifyTokenAndAdmin, updateAuthor)
    .delete(verifyTokenAndAdmin, deleteAuthor)

module.exports = router
