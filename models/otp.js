const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otp: {
    type: Number,
  },
  email: {
    type: String,
  },
});

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
