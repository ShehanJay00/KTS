const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  eId: {
    type: String,
    required: [true, "Employee ID is required"],
    unique: [true, "Employee ID already exists"],
  },
  fullName: {
    type: String,
    required: [true, "Full Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  mobile: {
    type: Number,
    required: [true, "Mobile number is required"],
    unique: [true, "Mobile number already exists"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["driver", "conductor"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  photo: {
    type: Object,
    default: {},
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
