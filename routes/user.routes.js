const router = require('express').Router()

const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/user.controller')

const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require('../middlewares/verifyToken.middlewares')


router.get('/', verifyTokenAndAdmin, getAllUsers)

// /api/users/:id
router
    .route('/:id')
    .put(verifyTokenAndAuthorization, updateUser)
    .get(verifyTokenAndAuthorization, getUserById)
    .delete(verifyTokenAndAuthorization, deleteUser)

module.exports = router
 