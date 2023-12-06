const mongoose = require("mongoose");

const roadRouteSchema = mongoose.Schema({
  rId: {
    type: String,
    required: true,
    unique: true,
  },
  startLocation: {
    type: Object,
    required: true,
  },
  googleRoute: {
    type: Object,
    required: true,
  },
  stations: {
    type: Array,
    default: [],
  },
});

const RoadRoute = mongoose.model("RoadRoute", roadRouteSchema);

module.exports = RoadRoute;
