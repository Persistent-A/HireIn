const express = require("express");
const router = express.Router();
const { registerInquiry, getInqiuries } = require("../controllers/constactUs");

router.route("/register").post(registerInquiry);
router.route("/get-inquiries").get(getInqiuries);

module.exports = router;
