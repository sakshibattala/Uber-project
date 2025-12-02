const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const { createUser } = require("../services/user.service");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;
  const hashedPassword = await userModel.hashPassword(password);
  const user = await createUser({ fullname, email, password: hashedPassword });
  const token = user.generateToken();

  res.status(201).send({ token, user });
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

  if (!user)
    return res.status(401).json({ message: "Invalid email or password." });

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return res.status(401).json({ message: "Invalid password." });

  const token = user.generateToken();
  res.status(200).send({ token, user });
};
