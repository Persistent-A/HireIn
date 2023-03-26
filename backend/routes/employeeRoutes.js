const express = require("express")
const router = express.Router()
const protect = require("../middlewares/protect")
const {registerEmployee, loginEmployee, updateEmployee} = require('../controllers/employeeController')

// Register and Login Routes for employee
router.route('/register/').post(registerEmployee)
router.route('/login/').post(loginEmployee)
router.route('/update/').put(protect, updateEmployee)

module.exports = router;