const express = require("express")
const router = express.Router()
const {loginAdmin} = require('../controllers/adminController')

// Login Routes for user
router.route('/login/').post(loginAdmin)

module.exports = router;