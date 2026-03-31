const router = require("express").Router()

const { createOrder } = require("../controller/orders")
const { authentication } = require("../middlewares/auth")

router.post('/order', authentication, createOrder)

module.exports = router