const express = require('express');
const router = express.Router();

const customerController = require('../../controller/user-controller/customer.ctrl')
const multer = require('multer')
const auth = require('../../Authorization/userAuth.token')

let storage = multer.diskStorage({
    destination: 'public/customer/media',
    filename: (request, file, callback) => {
        callback(null, "profile" + Date.now() + "_" + file.originalname)
    }
})

let upload = multer({storage: storage})



router.post('/sign-up', customerController.Signup)

router.post('/sign-in', customerController.Signin)

router.get('/verify-email/:id', customerController.verifyEmail)

router.post('/login-with-google', customerController.loginWithGoogle)

router.post('/verify-email-resend', customerController.resendVerifyEmail)
    
router.post('/reset-password', customerController.resetPassword)

router.post('/send-otp', customerController.sendOtp)


router.post('/verify-otp', customerController.verifyOTP)

router.post('/profile', upload.single("profilePic"), customerController.Profile)

// router.post('/profile-update', auth.verifytoken, upload.single("profilePic"), customerController.Profile)

module.exports = router;