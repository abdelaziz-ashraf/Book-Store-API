const joi = require('joi')

function validateRegisterUser(obj) {
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).required().email(),
        username: joi.string().trim().min(2).max(200).required(),
        password: joi.string().trim().min(6).required(),
    })

    return schema.validate(obj)
}

function validateLoginUser(obj) {
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).required().email(),
        password: joi.string().trim().min(6).required(),
    })

    return schema.validate(obj)
}

function validateUpdateUser(obj) {
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).email(),
        username: joi.string().trim().min(2).max(200),
        password: joi.string().trim().min(6),
    })
    
    return schema.validate(obj)
}

module.exports = {
    validateLoginUser,
    validateRegisterUser,
    validateUpdateUser
}