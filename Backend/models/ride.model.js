const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "captain",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },

  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "ongoing", "accepted", "rejected", "completed"],
    default: "pending",
  },

  duration: {
    type: Number,
  },

  distance: {
    type: Number,
  },

  paymentId: {
    type: Number,
  },
  orderId: {
    type: Number,
  },
  signature: {
    type: String,
  },
  otp: {
    type: String,
    select: false,
    required: true,
  },
});

const rideModel = mongoose.model("ride", rideSchema);

module.exports = rideModel;
