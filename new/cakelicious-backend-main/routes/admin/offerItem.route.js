const express = require('express');
const router = express.Router();
const offerItemController = require('../../controller/admin-controller/offerItem.ctrl')


const multer = require('multer');
var storage = multer.diskStorage({
    destination: 'public/images',
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var upload = multer({ storage: storage });

router.post("/addOffer",upload.single("Image"),offerItemController.addOffer);
router.get("/viewOffer",offerItemController.viewOffer);
router.post("/update",offerItemController.updateOffer);
router.post("/deleteOffer",offerItemController.deleteOffer);

module.exports = router;