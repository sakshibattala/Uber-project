const rideModel = require("../models/ride.model");
const { validationResult } = require("express-validator");
const rideService = require("../services/ride.service");
const mapService = require("../services/map.service");
const { sendMessageToSocketId } = require("../socket");

module.exports.createRide = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    const ride = await rideService.createRide({
      userId: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    res.status(201).json(ride);

    const pickupCoords = await mapService.getAddressCoordinate(pickup);

    ride.otp = "";

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("userId");

    const captainInRadius = await mapService.getNearByCaptains(
      pickupCoords.lng,
      pickupCoords.lat,
      5
    );

    captainInRadius.map((cap) => {
      sendMessageToSocketId(cap.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports.getFare = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;
    const fare = await rideService.getFare(pickup, destination);
    res.status(200).json(fare);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, captain } = req.body;
    const ride = await rideService.confirmRide(rideId, captain);

    sendMessageToSocketId(ride.userId.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    res.status(200).json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.startRide = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;
    const ride = await rideService.startRide(rideId, otp);
    console.log(ride);

    sendMessageToSocketId(ride.userId.socketId, {
      event: "ride-started",
      data: ride,
    });

    res.status(200).json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.finishRide = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    const ride = await rideService.finishRide({
      rideId,
      captain: req.captain._id,
    });

    sendMessageToSocketId(ride.userId.socketId, {
      event: "ride-completed",
      data: ride,
    });

    res.status(200).json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
