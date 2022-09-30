
const express = require('express');
const router = express.Router();
// lgjgjfjgsjfdjgjsfd
const cartController = require('../../controller/user-controller/cart.ctrl.js')
const auth = require('../../Authorization/userAuth.token')

router.post('/add-to-cart', auth.verifyToken, cartController.AddToCart)

router.post('/view-cart', auth.verifyToken, cartController.ViewCart)

router.post('/delete-cart-item', auth.verifyToken, cartController.DeleteCartItem)

router.post('/delete-cart', auth.verifyToken, cartController.DeleteCart)
module.exports = router;
