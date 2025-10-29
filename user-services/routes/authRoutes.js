const express = require('express')
const router = express.Router()
const {registerUser, loginUser} = require('../controller/authController')
const {protect, restrictTo} =  require('../middleware/authMiddleware')

router.post('/register', registerUser)

router.post('/login', loginUser)


router.get('/admin-dashboard', protect, restrictTo('admin'), (req, res) => {
    res.status(200).json( {
        message: `Welcome Admin ${req.user.firstName}`
    });
})

router.get('/user-dashboard', protect, restrictTo('admin', 'user'), (req, res) => {
    res.status(200).json( {
        message: `Welcome User ${req.user.firstName}`
    });
})

module.exports = router;