const asyncHandler = require('express-async-handler')

const Book = require('../models/book.model')
const {
    validateCreateBook,
    validateUpdateBook
} = require('../validation/book.validation')

module.exports.getAllBooks = asyncHandler(async (req, res, next) => {
    const {minPrice, maxPrice}  = req.query
    let allBooks
    if(minPrice && maxPrice){
        allBooks = await Book.find({
            price: { $gte: minPrice, $lte: maxPrice }
        }).populat('author', ['_id', 'firstName', 'lastName'])
    } else {
        allBooks = await Book.find().populate('author', ['_id','firstName','lastName'])
    }

    res.status(200).json(allBooks)
})

module.exports.getBookById = asyncHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.id).populate('author')
    if(book) {
        res.status(200).json(book)
    } else {
        res.status(404).json({ message: "book not found" })
    }
})

module.exports.createBook = asyncHandler(async (req, res, next) => {
    const {error} = validateCreateBook(req.body)
    if(error){
        return res.status(400).json({ message: error.details[0].message })
    }

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover
    })

    const savedBook = await book.save()
    res.status(201).json(savedBook)
})

module.exports.updateBook = asyncHandler(async (req, res, next) => {
    const {error} = validateUpdateBook(req.body)
    if(error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover,
          },
        },
        { new: true }
    )

    res.status(200).json(updatedBook)
})

module.exports.deleteBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.id)
    if (book) {
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "book has been deleted" })
    } else {
        res.status(404).json({ message: "book not found" })
    }
})