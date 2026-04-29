const { initializePaystackPayment, verifyPaystackPayment } = require('../controller/payment')
const { authentication } = require('../middlewares/auth')

const router = require('express').Router()

router.post('/initiate-payment/:orderId', authentication, initializePaystackPayment)
router.get('/verify-paystack-payment', authentication, verifyPaystackPayment)
// router.get('/all-paystack-payments', authentication, getAllPaymentsByUser)

module.exports = router