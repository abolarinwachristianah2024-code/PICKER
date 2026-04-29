const router = require("express").Router()
const { createConsumer, updateProfile, verifyEmail, login, resendEmail, forgotPassword, resetPassword, changePassword, loginWithGoogle } = require("../controller/consumer")
const { upload } = require('../middlewares/multer')
const { signUpValidator, changePasswordValidator, resetPasswordValidator } = require("../middlewares/validator")
const { authentication } = require("../middlewares/auth")
const { profile, loginProfile } = require("../middlewares/passport")


router.post('/consumer',signUpValidator, createConsumer)
router.put('/consumers/:id', upload.single('profilePicture'), updateProfile)
router.post('/consumer/check', verifyEmail)
router.post('/otp', resendEmail)
router.post('/login', login)


router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword',resetPasswordValidator, resetPassword)
router.post('/changePassword', authentication, changePasswordValidator, changePassword)

router.get('/auth/google', profile)
router.get('/auth/google/callback', loginProfile, loginWithGoogle)

module.exports = router

    // "name": "abolarinwa",
    // "email": "christianahabolarinwa7@gmail.com",
    // "phone": "09654328989",
    // "password": "christian678"