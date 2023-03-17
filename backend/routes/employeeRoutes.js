const express = require("express")
const router = express.Router()
const protect = require("../middlewares/protect")
const {registerEmployee, loginEmployee} = require('../controllers/employeeController')

// Register and Login Routes for employee
router.route('/register/').post(registerEmployee)
router.route('/login/').post(loginEmployee)
router.route('/update/').put(protect, loginEmployee)

module.exports = router;