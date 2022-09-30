
const express = require('express');
const multer = require('multer')
const router = express.Router();

const flavourController = require('../../controller/admin-controller/flavour.controller')

const storage = multer.diskStorage({
    destination: "public/images",
    filename: (request, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});
const upload = multer({ storage: storage });


router.post("/addflavour", upload.single('flavourimage'), flavourController.addToFlavour);
router.post("/findflavour", flavourController.findTheFlavour);
router.get("/findall", flavourController.findAllData);
router.post("/deleteflavour", flavourController.deleteTheFlavour);
router.post("/updateflavour", flavourController.updateTheFlavour);


module.exports = router;
