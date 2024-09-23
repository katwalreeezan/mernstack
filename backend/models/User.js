const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: [true, "Gender is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  dob: {
    type: Date,
    required: [true, "Date of Birth is required"],
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
