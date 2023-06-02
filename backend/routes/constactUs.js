const express = require("express");
const router = express.Router();
const {
  registerInquiry,
  getInqiuries,
  markResolveAppointment,
} = require("../controllers/constactUs");

router.route("/register").post(registerInquiry);
router.route("/get-inquiries").get(getInqiuries);
router.route("/resolve-inquiry/:appointment_id").put(markResolveAppointment);

module.exports = router;
