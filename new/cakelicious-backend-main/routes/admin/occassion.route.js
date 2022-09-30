const express = require('express');
const router = express.Router();
const occassionController = require('../../controller/admin-controller/occassion.ctrl')
const auth = require("../../Authorization/userAuth.token")

const multer = require('multer');
var storage = multer.diskStorage({
    destination: 'public/images',
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var upload = multer({ storage: storage });

router.post("/delete",auth.verifyToken,occassionController.deleteOccassion);

router.post('/update',upload.array('occImages'),occassionController.updateOccassion);

router.post("/addOccassion",auth.verifyToken, upload.array('occImages'), occassionController.addOccassion);

router.get("/viewOccassion", occassionController.getOccassion);

router.get("/viewOneOccassion/:occassionId",occassionController.getOneOccasssion);

module.exports = router;
