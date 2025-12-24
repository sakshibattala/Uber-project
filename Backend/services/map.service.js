const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const captainModel = require("../models/captain.model");

const helperFun = async (address) => {
  const apiKey = process.env.MAPS_KEY;

  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json`,
    {
      params: {
        access_token: apiKey,
        limit: 1,
      },
    }
  );

  const [lng, lat] = response.data.features[0].center;
  return { lat, lng };
};

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.MAPS_KEY;

  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json`,
      {
        params: {
          access_token: apiKey,
          limit: 1,
          country: "IN",
          types: "place,locality",
          language: "en",
        },
      }
    );

    if (!response.data.features.length) {
      throw new Error("Address not found");
    }

    const [lng, lat] = response.data.features[0].center;

    return { lat, lng };
  } catch (error) {
    console.error("Mapbox geocoding error:", error.message);
    throw error;
  }
};

module.exports.getDistanceAndTimeBtwAddresses = async (source, destination) => {
  if (!source || !destination) throw new Error("Both fields are required");

  try {
    const apiKey = process.env.MAPS_KEY;
    const sourceCoord = await helperFun(source);
    const destinationCoord = await helperFun(destination);

    const coordinates = [
      `${sourceCoord.lng},${sourceCoord.lat}`,
      `${destinationCoord.lng},${destinationCoord.lat}`,
    ].join(";");

    const response = await axios.get(
      `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${coordinates}`,
      {
        params: {
          access_token: apiKey,
          annotations: "distance,duration",
        },
      }
    );

    const matrix = response.data;

    const distanceInKm = (matrix.distances[0][1] / 1000).toFixed(2);
    const durationInMin = (matrix.durations[0][1] / 60).toFixed(1);

    return { distanceInKm, durationInMin };
  } catch (err) {
    console.error("Mapbox geocoding error:", err.message);
    throw err;
  }
};

module.exports.getAddressSuggestions = async (address) => {
  if (!address || address.length < 3)
    throw new Error("input is required or must be 3 chars long");

  try {
    const apiKey = process.env.MAPS_KEY;

    const response = await axios.get(
      "https://api.mapbox.com/search/searchbox/v1/suggest",
      {
        params: {
          access_token: apiKey,
          q: address,
          limit: 5,
          country: "IN",
          session_token: uuidv4(),
        },
      }
    );
    return response.data.suggestions;
  } catch (err) {
    console.error(
      "Mapbox suggestion error:",
      err.response?.data || err.message
    );
    throw new Error("Failed to fetch address suggestions");
  }
};

module.exports.getNearByCaptains = async (lng, ltd, radiusInKm) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        //geowithin operator searches the captain within its circle and center sphere points the center with ltd and lng so overall it's create circle with give raduiys in km and looks for the captains
        $centerSphere: [[lng, ltd], radiusInKm / 6371], // 6371 is earth radius
      },
    },
  });

  return captains;
};
