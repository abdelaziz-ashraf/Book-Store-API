const mongoose = require('mongoose')

const authorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    image: {
        type: String,
        default: "default-avatar.png"
    }
}, {timestamps: true})

const Author = mongoose.model('author', authorSchema)

module.exports = Author