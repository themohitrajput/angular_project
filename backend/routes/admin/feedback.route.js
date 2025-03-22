const express = require('express');
const router = express.Router();
const auth = require("../../Authorization/userAuth.token")

const feedbackController = require('../../controller/admin-controller/feedback.ctrl')

router.post("/addFeedback", auth.verifyToken, feedbackController.addFeedback)
router.get("/viewFeedback", auth.verifyToken, feedbackController.viewFeedback)


module.exports = router;
