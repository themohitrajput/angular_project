const express = require('express');
const router = express.Router();

const wishlistController = require('../../controller/user-controller/wishlist.ctrl')

const auth = require('../../Authorization/userAuth.token')

router.post('/add-to-wishlist', auth.verifyToken, wishlistController.AddToWishlist)

router.post('/view-wishlist', auth.verifyToken, wishlistController.ViewWishlist)

router.post('/delete-wishlist-item', auth.verifyToken, wishlistController.DeleteWishlistItem)

router.post('/delete-wishlist', auth.verifyToken, wishlistController.DeleteWishlist)

module.exports = router;
