const blacklistTokenModel = require("../models/blacklistToken.model");
const captionModel = require("../models/caption.model");
const captionService = require("../services/caption.service");
const { validationResult } = require("express-validator");

module.exports.registerCaption = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;

  const isCaptionExist = await captionModel.findOne({ email });
  if (isCaptionExist) {
    return res.status(200).json({ message: "Caption already exists" });
  }
  const hashedPassword = await captionModel.hashPassword(password);

  const captain = await captionService.createCaption({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();
  res.status(201).json({ token, captain });
};

module.exports.loginCaption = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const captain = await captionModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = captain.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain });
};

module.exports.getCaptionProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaption = async (req, res, next) => {
  try {
    // console.log("Cookies:", req.cookies);
    // console.log("Authorization Header:", req.headers.authorization);
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blacklistTokenModel.create({ token });

    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
