const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      require: true,
      minLength: [3, "First name must be atleast 3 characters long"],
    },
    lastname: {
      type: String,
      minLength: [3, "Last name must be atleast 3 characters long"],
    },
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      require: true,
      minLength: [3, "Color must be atleast 3 characters long"],
    },
    plate: {
      type: String,
      require: true,
      minLength: [3, "Plate must be atleast 3 characters long"],
    },
    capacity: {
      type: Number,
      require: true,
      min: [1, "Capacity must be atleast 1"],
    },
    vehicleType: {
      type: String,
      require: true,
      enum: ["car", "notorcycle", "auto"],
    },
  },
  location: {
    ltd: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
