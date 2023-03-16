const express = require("express")
const router = express.Router()
const {registerEmployer, loginEmployer} = require('../controllers/employerController')


// Register and Login Routes for employer
router.route('/register/').post(registerEmployer)
router.route('/login/').post(loginEmployer)

module.exports = router;