const express = require("express");
const router = express.Router();
const {
  sendResetPassLink,
  resetPassword,
} = require("../controllers/forgotPass");

router.route("/send-reset-pass-link/").post(sendResetPassLink);
router.route("/reset-password/").put(resetPassword);

module.exports = router;
