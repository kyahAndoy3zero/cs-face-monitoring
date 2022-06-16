const express = require('express')
const router = express.Router()
const {registerUser, loginUser, profileUser} = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware')


router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/profile', protect, profileUser)


module.exports = router