const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 250
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "author"
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    cover: {
        type: String,
        required: true,
        enum: ["soft cover", "hard cover"]
    },
}, { timestamps: true });

const Book = mongoose.model('book', bookSchema)

module.exports = Book