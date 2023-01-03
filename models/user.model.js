const mongoose = require('mongoose') 
const jwt  = require('jsonwebtoken') 

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

userSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin },process.env.JWT_SECRET_KEY);
}

const User = mongoose.model('user', userSchema)

module.exports = User