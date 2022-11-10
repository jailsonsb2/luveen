const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Profile = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    fname: String,
    profession: String,
    DOB: String,
    titleline: String,
    about: String,
    img: {
      type: String,
      default: "",
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Profile", Profile);