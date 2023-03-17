const express = require("express")
const router = express.Router()
const protect = require('../middlewares/protect')
const {registerEmployer, loginEmployer, updateEmployer} = require('../controllers/employerController')


// Register and Login Routes for employer
router.route('/register/').post(registerEmployer)
router.route('/login/').post(loginEmployer)
router.route('/update/').put(protect, updateEmployer)

module.exports = router;