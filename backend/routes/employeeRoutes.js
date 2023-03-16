const express = require("express")
const router = express.Router()
const {registerEmployee, loginEmployee} = require('../controllers/employeeController')

// Register and Login Routes for employee
router.route('/register/').post(registerEmployee)
router.route('/login/').post(loginEmployee)

module.exports = router;