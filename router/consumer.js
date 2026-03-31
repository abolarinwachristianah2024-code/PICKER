const router = require("express").Router()
const { createConsumer, updateProfile, verifyEmail, login, resendEmail } = require("../controller/consumer")
const { upload } = require('../middlewares/multer')


router.post('/consumer', createConsumer)
router.put('/consumers/:id', upload.single('profilePicture'), updateProfile)
router.post('/consumer/check', verifyEmail)
router.post('/otp', resendEmail)
router.post('/login', login)

module.exports = router

    // "name": "abolarinwa",
    // "email": "christianahabolarinwa7@gmail.com",
    // "phone": "09654328989",
    // "password": "christian678"