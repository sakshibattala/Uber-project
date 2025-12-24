const captainModel = require("../models/captain.model");

module.exports.captainService = async ({
  firstname,
  lastname,
  email,
  password,
  vehicle,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !vehicle.color ||
    !vehicle.plate ||
    !vehicle.capacity ||
    !vehicle.vehicleType
  ) {
    throw new Error("All fields are required");
  }

  const captain = captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color: vehicle.color,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
      plate: vehicle.plate,
      location: {
        type: "Point",
        coordinates: [0, 0],
      },
    },
  });

  return captain;
};
