const express = require('express');
const router = express.Router();
const auth = require("../../Authorization/userAuth.token")
const orderController = require('../../controller/admin-controller/order.ctrl')
router.get("/viewOrder",auth.verifyToken, orderController.orderDetail)
router.post("/singleViewOrder",auth.verifyToken, orderController.singleOrderDetail)
router.post("/updateStatus",auth.verifyToken, orderController.updateStatus)
module.exports = router;
