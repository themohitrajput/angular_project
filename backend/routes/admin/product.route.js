const express = require('express');
const router = express.Router();
const productController = require('../../controller/admin-controller/product.ctrl')
const auth = require("../../Authorization/userAuth.token")

const multer = require('multer');
var storage = multer.diskStorage({
    destination: 'public/images',
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var upload = multer({ storage: storage });


router.post("/addProduct", upload.array('prodImages'), productController.addProduct);

router.get("/viewProduct", productController.getProduct);

router.post("/deleteProduct",  productController.deleteProduct);

router.get("/textsearch-product/:text",auth.verifyToken,productController.searchProduct);

router.get('/category-product/:cid',productController.categorybyproduct);

router.get('/occassion-product/:oid',productController.occassionbyproduct);
//  router.post("/updateProduct",auth.verifyToken, upload.array('prodsImages'), productController.updateProduct);

router.post("/deleteOneReview" , auth.verifyToken, productController.deleteOneReview)
router.get("/viewReview" , auth.verifyToken, productController.viewReview)

router.get("/getProductbyFlavour/:fid",productController.productByFlavour)




module.exports = router;
