const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
userSchema.methods.generateAuthToken = async function () {
  const token = await jwt.sign({ _id: this._id }, "AnshTyagiSecretKeyIsHere");
  return token;
};

userSchema.methods.isPasswordValid = async function (passwordEnteredByUser) {
  // this returns a promis so needs to be async and await
  const isValid = await bcrypt.compare(passwordEnteredByUser, this.password);
  return isValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
