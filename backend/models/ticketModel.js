const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  station: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  seatCount: {
    type: Number,
    required: true,
  },
  roadRouteId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  qrCode: {
    type: String,
    required: true,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
