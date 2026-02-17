const mapService = require("../services/map.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { address } = req.query;
    const coordinates = await mapService.getAddressCoordinate(address);
    return res.status(200).json(coordinates);
  } catch (err) {
    console.log(err);
    res.status(404).send("unable to find coordinates");
  }
};

module.exports.getDistanceAndTime = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { source, destination } = req.query;
    const result = await mapService.getDistanceAndTimeBtwAddresses(
      source,
      destination,
    );

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send("Internal server error");
  }
};

module.exports.getSuggestions = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;
    const suggestions = await mapService.getAddressSuggestions(input);

    res.status(200).send(suggestions);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};
