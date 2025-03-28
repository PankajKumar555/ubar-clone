const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { getCoordinates } = require("../controllers/map.controller");
const { getDistanceTime } = require("../controllers/map.controller");

router.get("/get-coordinates", authMiddleware.authUser, getCoordinates);
router.get("/get-distance-time", authMiddleware.authUser, getDistanceTime);

module.exports = router;
