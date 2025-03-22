const express = require('express');
const router = express.Router();
const auth = require("../../Authorization/userAuth.token")

const supportController = require('../../controller/admin-controller/support.ctrl')

router.post('/addQuery',auth.verifyToken,supportController.addQuery)
router.get('/viewQuery',supportController.viewQuery)
router.post('/giveSupport',auth.verifyToken,supportController.giveSupport)

module.exports = router;