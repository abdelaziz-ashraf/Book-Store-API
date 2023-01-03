const joi = require('joi');

function validateCreateBook(obj) {
    const schema = joi.object({
        title: joi.string().trim().min(3).max(250).required(),
        author: joi.string().required(),
        description: joi.string().trim().min(5).required(),
        price: joi.number().min(0).required(),
        cover: joi.string().valid("soft cover", "hard cover").required()
    })
  
    return schema.validate(obj);
}

function validateUpdateBook(obj) {
    const schema = joi.object({
        title: joi.string().trim().min(3).max(250),
        author: joi.string(),
        description: joi.string().trim().min(5),
        price: joi.number().min(0),
        cover: joi.string().valid("soft cover", "hard cover"),
    });
  
    return schema.validate(obj);
}
  
module.exports = {
    validateCreateBook,
    validateUpdateBook,
}