const captionModel = require("../models/user.model");
const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    // If token is not in cookies, check Authorization header
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;

      if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; // Extract token correctly
      }
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized token" });
    }

    // Check if token is blacklisted
    const isBlackListed = await blacklistTokenModel.findOne({ token });

    if (isBlackListed) {
      return res.status(401).json({ message: "Unauthorized token" });
    }

    // Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: error.message });
  }
};

module.exports.authCaption = async (req, res, next) => {
  try {
    let token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized token" });
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token });

    if (isBlackListed) {
      return res.status(401).json({ message: "Unauthorized token" });
    }
    // If token is not in cookies, check Authorization header
    // if (!token && req.headers.authorization) {
    //   const authHeader = req.headers.authorization;

    //   if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    //     token = authHeader.split(" ")[1]; // Extract token correctly
    //   }
    // }

    // Check if token is blacklisted

    // Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const caption = await captionModel.findById(decoded._id);
    req.caption = caption;
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: error.message });
  }
};
