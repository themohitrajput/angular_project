
const express = require('express');

const router = express.Router();

const orderController = require('../../controller/user-controller/order.ctrl')
const auth = require('../../Authorization/userAuth.token')

router.post('/create-order', auth.verifyToken, orderController.createOrderId)

router.post('/place-order', auth.verifyToken, orderController.placeOrder)


router.post('/buy-now', auth.verifyToken, orderController.buyNow)
router.post('/view-order', auth.verifyToken, orderController.viewOrder)
router.post('/cash-on-delivery', auth.verifyToken, orderController.cashOnDelivery)

module.exports = router;
