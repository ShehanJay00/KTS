const express = require("express");
const {
  createRoadRoute,
  getAllRoadRoutes,
  deleteRoadRoute,
} = require("../controllers/roadRouteController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createRoadRoute);
router.get("/", getAllRoadRoutes);
router.delete("/:id", deleteRoadRoute);

module.exports = router;
