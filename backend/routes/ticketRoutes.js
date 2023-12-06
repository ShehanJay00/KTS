const express = require("express");
const { addTicket, getAllTickets } = require("../controllers/ticketController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, addTicket);

router.get("/", getAllTickets);

module.exports = router;
