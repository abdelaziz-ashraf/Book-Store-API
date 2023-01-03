const Author = require('../models/author.model')
const asyncHandler = require("express-async-handler");

const { validateCreateAuthor, validateUpdateAuthor } = require('../validation/author.validation')

module.exports.getAllAuthors = asyncHandler(async (req, res, next) => {
    const {pageNumber} = req.query
    const authorsPerPage = 2

    const allAuthors = await Author
        .find()
        .skip((pageNumber-1) * authorsPerPage)
        .limit(authorsPerPage)

    res.status(200).json(allAuthors)
})

module.exports.getAuthorById = asyncHandler(async (req, res, next) => {
    const author = await Author.findById(req.params.id)
    if(author){
        res.status(200).json(author)
    } else {
        res.status(404).json({ message: "author not found" })
    }
})

module.exports.createAuthor = asyncHandler(async (req, res, next) => {
    const {error} = validateCreateAuthor(req.body)

    if(error){
        return res.status(400).json({ message: error.details[0].message })
    }

    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image
    })

    const savedAuthor = await author.save()
    res.status(201).json(savedAuthor)
})

module.exports.updateAuthor = asyncHandler(async (req, res, next) => {
    const {error}  = validateUpdateAuthor(req.body)
    if(error){
        return res.status(400).json({ message: error.details[0].message }) 
    }  

    const updatedAuthor = await Author.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nationality: req.body.nationality,
                image: req.body.image,
            },
        },
        { new: true }
    )

    res.status(200).json(updatedAuthor)
})

module.exports.deleteAuthor = asyncHandler(async (req, res, next) => {
    const author = await Author.findById(req.params.id)
    if(author){
        await Author.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "author has been deleted" })
    } else {
        res.status(404).json({ message: "author not found" })
    }
})
