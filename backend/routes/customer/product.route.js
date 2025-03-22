const express = require('express');
const router = express.Router();

const productController = require('../../controller/user-controller/product.ctrl');

const auth = require('../../Authorization/userAuth.token')

router.get("/getProductBycategory/:categoryId", productController.getProductByCategory);

router.get("/getProductById/:pId", productController.getProductById);

router.get("/searchProduct/:text", productController.searchProduct)

router.post("/addReview" , productController.addReview);
router.post("/editReview" , productController.editReview);


module.exports = router;
