const bcrypt = require("bcrypt");
const User = require("../models/users");
const { userSignupValidation } = require("../utils/validation");
const jwt = require("jsonwebtoken");

exports.userSignup = async (req, res) => {
  try {
    userSignupValidation(req); //User Validation using Validator Function
    const { firstName, lastName, email, password, age, gender, skills } =
      req.body;

    //Hashing or creating a Hash to save in the DataBase
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, //we set the default value of password to hashedPassword concept of object destructuring
      age,
      gender,
      skills,
    }); //Here we are creating a new instance of the User model and passing the userData object to it.

    await user.save(); //Here we are saving the user object to the database.
    res.send("The user has been saved to Database");
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.email) {
      res.status(400).send({ error: "Email already exists" });
    } else {
      res.status(400).send({ error: err.message }); //If there is an error, we are sending the error message to the client.
    }
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: "Invalid Email" });
  }

  const isPasswordValid = await user.isPasswordValid(password); //here the user is the extracted object above by User.findone();
  console.log(isPasswordValid);
  //req.body.password also works here
  if (isPasswordValid) {
    const token = await user.generateAuthToken();

    res.cookie("token", token);

    res.send("User LoggedIn");
  }
  if (!isPasswordValid) {
    res.send("Invalid Credentials");
  }
};

exports.userProfile = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.send("The error occured here is given" + err.message);
  }
};

exports.allUserProfile = async (req, res) => {
  try {
    const users = await User.find({}, { firstName: 1, _id: 0 });
    res.send(users);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.updateUser = async (req, res) => {
  const userid = req.params?.userId;
  const updatedUser = req.body;

  try {
    const ALLOWED_UPDATES = ["firstName", "lastName", "gender", "skills"];
    const isUpdateValid = Object.keys(updatedUser).every((field) =>
      ALLOWED_UPDATES.includes(field)
    );

    if (!isUpdateValid) {
      throw new Error("Only {Name,Gender,skills} changes are allowed");
    }

    const user = await User.findByIdAndUpdate(userid, updatedUser, {
      runValidators: true,
    });
    if (user) {
      res.send("Then user has been updated");
    } else {
      res.send("User not found in the database");
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.body.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.send(deletedUser);
  } catch (err) {
    res.status(404).send(err);
  }
};
