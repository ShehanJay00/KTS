const RoadRoute = require("../models/roadRouteModel");
const asyncHandler = require("express-async-handler");

const createRoadRoute = asyncHandler(async (req, res) => {
  const { rId, startLocation, googleRoute, stations } = req.body;

  const roadRoute = new RoadRoute({
    rId,
    startLocation,
    googleRoute,
    stations,
  });

  try {
    const createdRoadRoute = await roadRoute.save();

    if (createdRoadRoute) {
      res.status(201).json({
        _id: createdRoadRoute._id,
        rId: createdRoadRoute.rId,
        startLocation: createdRoadRoute.startLocation,
        googleRoute: createdRoadRoute.googleRoute,
        stations: createdRoadRoute.stations,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Road Route data");
    }
  } catch (err) {
    res.status(500);
    console.log(err);
    throw new Error(err);
  }
});

const getAllRoadRoutes = asyncHandler(async (req, res) => {
  const roadRoutes = await RoadRoute.find({});
  res.status(201).json(roadRoutes);
});

const deleteRoadRoute = asyncHandler(async (req, res) => {
  const roadRoute = await RoadRoute.findById(req.params.id);

  if (roadRoute) {
    await roadRoute.deleteOne();
    res.status(200).json({ message: "Road Route removed" });
  } else {
    res.status(404);
    throw new Error("Road Route not found");
  }
});

module.exports = { createRoadRoute, getAllRoadRoutes, deleteRoadRoute };
