const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const managerRoutes = require("./routes/managerRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const busRoutes = require("./routes/busRoutes");
const roadRouteRoutes = require("./routes/roadRouteRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const ticketRoutes = require("./routes/ticketRoutes");
//middleware
const morgan = require("morgan");
const app = express();

//middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

//routes
app.use("/api/users", userRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/roadRoutes", roadRouteRoutes);
app.use("/api/tickets", ticketRoutes);

//ERROR Middleware
app.use(errorHandler);

if (require.main === module) {
  // Only connect to DB and start the server when server.js is run directly.
  connectDb().then(async () => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  });
}

// export app for testing (so tests can import without starting the server or connecting DB)
module.exports = app;
