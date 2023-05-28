const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  addService,
  getServices,
} = require("../controllers/adminController");

// Login Routes for user
router.route("/login/").post(loginAdmin);
router.route("/add-service/").post(addService);
router.route("/get-services/").get(getServices);

module.exports = router;
