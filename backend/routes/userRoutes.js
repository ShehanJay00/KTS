const express = require("express");
const {
  getAllUsers,
  userLogin,
  getUserprofile,
  getUserById,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

//login
router.post("/login", userLogin);
//get all users   for manager
router.get("/", protect, getAllUsers);
//get single user -----for user
router.get("/getUser", protect, getUserprofile);
//ger single user by id    --for manager
router.get("/:id", protect, getUserById);
//change password  --user
router.patch("/changePassword", protect, changePassword);
//forgot password
router.post("/forgotPassword", forgotPassword);
//reset password
router.put("/resetPassword/:resetToken", resetPassword);
module.exports = router;
