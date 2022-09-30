const express = require('express');
const router = express.Router();

const multer = require('multer');
var storage = multer.diskStorage({
    destination: 'public/images',
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var upload = multer({ storage: storage });
const categoryController = require('../../controller/admin-controller/category.ctrl');

const auth = require("../../Authorization/userAuth.token")

router.post("/addCategory",auth.verifyToken,upload.single('catImage'), categoryController.addCategory);


router.get("/viewCategory",auth.verifyToken, categoryController.getCategory);
router.get("/viewCategoryByuser", categoryController.getCategory);

router.post("/deleteCategory", auth.verifyToken, categoryController.deleteCategory);

router.post("/updateCategory", auth.verifyToken, upload.single('catImage'), categoryController.updateCategory);

module.exports = router;
