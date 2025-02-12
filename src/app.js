const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/users");
const bcrypt = require("bcrypt");
const { userSignupValidation } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/userRoutes");
const connectionRequestRoutes = require("./routes/connectionRequestsRoutes");
const { userAuth } = require("./middlewares/auth");

app.use(express.json()); //This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(cookieParser());

app.use("/", userRoutes); //Route Signup,Login
app.use("/", connectionRequestRoutes); //Route for Connection Requests Handling

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
