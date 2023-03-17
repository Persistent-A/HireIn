const express = require("express")
const router = express.Router()
const { sendResetPassLink } = require("../controllers/forgotPass")


router.route('/send-reset-pass-link/').post(sendResetPassLink)

module.exports = router;