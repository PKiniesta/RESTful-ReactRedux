const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = new Schema({
  login: { type: String },
  password: { type: String }
});

module.exports = mongoose.model("User", userModel);
