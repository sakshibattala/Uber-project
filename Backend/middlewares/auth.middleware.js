const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blackListToken.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token ||  req.headers.authorization?.split(' ')[1];

  const isBlackListToken = await blackListTokenModel.findOne({ token });
  console.log(isBlackListToken)

  if (isBlackListToken)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findOne({ _id: decoded._id });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
