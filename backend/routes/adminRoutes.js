const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  addService,
  getServices,
  getUser,
  deleteUserAccount
} = require("../controllers/adminController");

// Login Routes for user
router.route("/login/").post(loginAdmin);
router.route("/add-service/").post(addService);
router.route("/get-services/").get(getServices);
router.route("/get-user/").post(getUser);
router.route("/delete-user/:userId").delete(deleteUserAccount);

module.exports = router;
