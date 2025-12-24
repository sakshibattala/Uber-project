const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const connectToDb = require("./DB/db.js");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes.js");
const mapRoutes = require("./routes/map.routes.js");
const rideRoutes = require("./routes/ride.routes.js");

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
