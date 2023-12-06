const Manager = require("../models/managerModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//login for manager
const managerLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("Invalid user data");
  }
  //check if user exist
  const manager = await Manager.findOne({ email });

  if (!manager) {
    res.status(400);
    throw new Error("Please enter a valid email");
  }

  //check if password match
  const isMatch = await bcrypt.compare(password, manager.password);

  if (isMatch) {
    const token = generateToken(manager._id);
    res.status(200).json({
      email,
      eId: manager.eId,
      fullName: manager.fullName,
      mobileNo: manager.mobileNo,
      photo: manager.photo,
      location: manager.location,
      shortName: manager.shortName,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Please check your password");
  }
});

//get all managers
const getAllManagers = asyncHandler(async (req, res) => {
  try {
    const managers = await Manager.find({}).select("-password");
    res.json(managers);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//get manager profile --manager
const getManagerProfile = asyncHandler(async (req, res) => {
  const id = req.person._id;
  const personType = req.personType;

  if (personType === "user") {
    res.status(401);
    throw new Error("Not authorized , Please login as a manager");
  }

  //exclude password
  const manager = await Manager.findById(id).select("-password");

  if (manager) {
    res.status(200).json(manager);
  } else {
    res.status(404);
    throw new Error("Manager not found");
  }
});

module.exports = {
  getAllManagers,
  managerLogin,
  getManagerProfile,
};
