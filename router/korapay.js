const { initializePayment, verifyPayment, getAllPaymentsByUser } = require('../controller/korapay')
const { authentication } = require('../middlewares/auth')

const router = require('express').Router()

router.post('/make-payment/:groupId', authentication, initializePayment)
router.get('/verify-payment', authentication, verifyPayment)
router.get('/all-payments', authentication, getAllPaymentsByUser)

module.exports = router