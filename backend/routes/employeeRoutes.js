const express = require("express");
const router = express.Router();
const protect = require("../middlewares/protect");
const {
  registerEmployee,
  loginEmployee,
  updateEmployee,
  getIndividualEmployee,
  getAppoitments,
} = require("../controllers/employeeController");

// Register and Login Routes for employee
router.route("/register/").post(registerEmployee);
router.route("/login/").post(loginEmployee);
router.route("/update/").put(protect, updateEmployee);
// To get individual employee
router.route("/display_individual_employee/:id").get(getIndividualEmployee);
router.route("/get-appointments/").get(protect, getAppoitments);

module.exports = router;
