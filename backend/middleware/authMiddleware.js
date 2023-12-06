const User = require("../models/userModel");
const Manager = require("../models/managerModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      res.status(401);
      throw new Error("Not authorized , Please login");
    }

    //verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    let personType = "";
    let person;

    //get user if from token
    person = await User.findById(verified.id).select("-password");

    if (person) {
      personType = "user";
    } else {
      person = await Manager.findById(verified.id).select("-password");
      if (person) {
        personType = "manager";
      }
    }

    if (!person) {
      res.status(401);
      throw new Error("User not found");
    }

    req.person = person;
    req.personType = personType;
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized , Please login");
  }
});

module.exports = protect;
