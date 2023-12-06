const express = require("express");
const {
  getAllManagers,
  managerLogin,
  getManagerProfile,
} = require("../controllers/managerController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

//get all managers
router.get("/", getAllManagers);
//login
router.post("/login", managerLogin);
//get single user -----for manager
router.get("/getManager", protect, getManagerProfile);

module.exports = router;
