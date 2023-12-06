const mongoose = require("mongoose");

const busSchema = mongoose.Schema({
  busId: {
    type: String,
    required: [true, "Please enter bus id"],
    unique: [true, "Bus id already exists"],
  },
  registrationNumber: {
    type: String,
    required: [true, "Please enter registration number"],
    unique: [true, "Registration number already exists"],
  },
  chassisNumber: {
    type: String,
    required: [true, "Please enter chassis number"],
    unique: [true, "Chassis number already exists"],
  },
  model: {
    type: String,
    required: [true, "Please enter model"],
  },
  seatingCapacity: {
    type: Number,
    required: [true, "Please enter seating capacity"],
  },
  color: {
    type: String,
    required: [true, "Please enter color"],
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  conductor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  owner: {
    type: String,
    required: [true, "Please enter owner name"],
  },
  photo: {
    type: Object,
    default: {},
  },
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
