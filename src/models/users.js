const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Enter FirstName"],
      minlength: [2, "The name should contain atleast 2 letters"],
      maxlength: [50],
    },

    lastName: {
      type: String,
      minlength: [2, "The name should contain atleast 2 letters"],
      maxlength: [50],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Give a strong password");
        }
      },
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["Male", "Female", "Other"].includes(value)) {
          throw new Error("Enter Male,female or Other");
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
