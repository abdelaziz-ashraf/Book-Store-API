const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")

const User = require('../models/user.model')
const {validateUpdateUser} = require('../validation/user.validation')

module.exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find({}, {password: 0})
    res.status(200).json(users)
})

module.exports.getUserById = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id, {password: 0})
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "user not found" });
    }
})

module.exports.updateUser = asyncHandler(async (req, res, next) => {
    const { error } = validateUpdateUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
          },
        },
        { new: true }
    ).select("-password");
    
    res.status(200).json(updatedUser)

})

module.exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "user has been deleted successfully" });
    } else {
        res.status(404).json({ message: "user not found" });
    }
})