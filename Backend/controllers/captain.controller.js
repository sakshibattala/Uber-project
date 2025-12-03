const captainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const { captainService } = require("../services/captain.service");
const blackListTokenModel = require("../models/blackListToken.model");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExists = await captainModel.findOne({ email });
  if (isCaptainAlreadyExists)
    return res.status(401).json("captain already exists");

  const hashedPassword = await captainModel.hashPassword(password);
  const captain = await captainService({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    vehicle,
  });

  const token = captain.generateToken();
  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain)
    return res.status(404).json({ message: "Invalid user or password." });

  const isMatch = await captain.comparePassword(password);
  if (!isMatch)
    return res.status(404).json({ message: "Invalid user or password." });

  const token = captain.generateToken();
  res.cookie("token", token);
  res.status(201).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.captainLogout = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    await blackListTokenModel.create({token});
    res.clearCookie("token")
    res.status(200).json({ message: "Captain Logged out" });
};
