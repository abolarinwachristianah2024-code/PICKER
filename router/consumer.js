const router = require("express").Router()
const { createConsumer, updateProfile, verifyEmail, login } = require("../controller/consumer")
const { upload } = require('../middlewares/multer')


router.post('/consumer', createConsumer)
router.put('/consumers/:id', upload.single('profilePicture'), updateProfile)
router.post('/consumer/check', verifyEmail)
router.post('/login', login)

module.exports = router