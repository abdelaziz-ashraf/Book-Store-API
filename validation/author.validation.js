const joi = require('joi')

function validateCreateAuthor(obj) {
    const schema = joi.object({
        firstName: joi.string().trim().min(3).max(200).required(),
        lastName: joi.string().trim().min(3).max(200).required(),
        nationality: joi.string().trim().min(2).max(100).required(),
        image: joi.string()
    })

    return schema.validate(obj)
}

function validateUpdateAuthor(obj) {
    const schema = joi.object({
        firstName: joi.string().trim().min(3).max(200),
        lastName: joi.string().trim().min(3).max(200),
        nationality: joi.string().trim().min(2).max(100),
        image: joi.string()
    })

    return schema.validate(obj)
}

module.exports = {
    validateCreateAuthor,
    validateUpdateAuthor
}