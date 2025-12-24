const rideModel = require("../models/ride.model");
const mapService = require("./map.service");
const crypto = require("crypto");

const getFare = async (pickup, destination) => {
  if (!pickup || !destination) throw new Error("all fields are required");

  const timeDistance = await mapService.getDistanceAndTimeBtwAddresses(
    pickup,
    destination
  );
  // convert strings → numbers
  const distanceKm = parseFloat(timeDistance.distanceInKm);
  const durationMin = parseFloat(timeDistance.durationInMin);

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };

  const farePerKm = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };

  const farePerMin = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceKm * farePerKm.auto + durationMin * farePerMin.auto)
    ),

    car: Math.round(
      baseFare.car + (distanceKm * farePerKm.car + durationMin * farePerMin.car)
    ),

    motorcycle: Math.round(
      baseFare.motorcycle +
        (distanceKm * farePerKm.motorcycle +
          durationMin * farePerMin.motorcycle)
    ),
  };

  return fare;
};

module.exports = { getFare };

const generateOTP = (n) => {
  return crypto.randomInt(Math.pow(10, n - 1), Math.pow(10, n));
};

module.exports.createRide = async ({
  userId,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!pickup || !destination || !vehicleType)
    throw new Error("all fields are required");

  const fare = await getFare(pickup, destination);

  const newRide = await rideModel.create({
    userId,
    pickup,
    destination,
    vehicleType,
    fare: fare[vehicleType],
    otp: generateOTP(6),
  });

  return newRide;
};

module.exports.confirmRide = async (rideId, captain) => {
  if (!rideId) throw new Error("ride id not found");

  await rideModel.findByIdAndUpdate(rideId, {
    status: "accepted",
    captain: captain._id,
  });

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("userId")
    .populate("captain")
    .select("+otp");

  if (!ride) throw new Error("ride not found");

  return ride;
};

module.exports.startRide = async (rideId, otp) => {
  if (!rideId || !otp) throw new Error("ride id or otp not found");

  const ride = await rideModel
    .findById(rideId)
    .populate("userId")
    .populate("captain")
    .select("+otp");

  if (!ride) throw new Error("ride not found");

  if (!ride.status === "accepted") throw new Error("ride not accepted");

  if (!ride.otp === otp) throw new Error("Invalid or wrong otp");

  await rideModel.findByIdAndUpdate(rideId, {
    status: "ongoing",
  });

  return ride;
};

module.exports.finishRide = async ({ rideId, captain }) => {
  if (!rideId || !captain) throw new Error("ride id or captain not found");

  console.log(captain);

  const ride = await rideModel
    .findOne({ _id: rideId, captain: captain })
    .populate("userId")
    .populate("captain");

  if (!ride) throw new Error("captain might not be the same");

  if (!ride.status === "ongoing") throw new Error("ride is not ongoing");

  await rideModel.findByIdAndUpdate(rideId, {
    status: "completed",
  });

  return ride;
};
