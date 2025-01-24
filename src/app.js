const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/users");
const bcrypt = require("bcrypt");
const { userSignupValidation } = require("./utils/validation");

app.use(express.json()); //This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

app.post("/users", async (req, res) => {
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
});
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { firstName: 1, _id: 0 });
    res.send(users);
  } catch (err) {
    res.status(404).send(err);
  }
});

app.patch("/users/:userId", async (req, res) => {
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
});

app.delete("/user", async (req, res) => {
  const userId = req.body.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.send(deletedUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

connectDb()
  .then(() => {
    console.log("Database is Connected Here");
    app.listen(7777, () => {
      console.log("The Server has started");
    });
  })
  .catch((err) => {
    console.error("Database connection failed here");
  });
