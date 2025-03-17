const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};

module.exports.logoutUser = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);
    console.log("Authorization Header:", req.headers.authorization);

    let token = req.cookies.token;

    // Clear the cookie first
    res.clearCookie("token");

    // Check if Authorization header exists before splitting
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;

      if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; // Correctly extract token
      } else {
        return res
          .status(400)
          .json({ message: "Invalid Authorization header format" });
      }
    }

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Save the token to the blacklist (if using token-based logout)
    await blacklistTokenModel.create({ token });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    return res
      .status(500)
      .json({ message: "Logout failed", error: error.message });
  }
};
