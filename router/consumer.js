const router = require("express").Router()
const { createConsumer, updateProfile } = require("../controller/consumer")
const { upload } = require('../middlewares/multer')


router.post('/consumer', createConsumer)
router.put('/consumers/:id', upload.single('profilePicture'), updateProfile)

module.exports = router