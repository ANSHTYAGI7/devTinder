const jwt = require("jsonwebtoken");
const User = require("../models/users");

const userAuth = async (req, res, next) => {
  //read token from the req.cookies here

  try {
    const cookies = req.cookies;
    const { token } = cookies;

    //verify the given token
    const tokenDataInObject = await jwt.verify(
      token,
      "AnshTyagiSecretKeyIsHere"
    ); //the _id is here of the particular user
    if (!tokenDataInObject) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    const { _id } = tokenDataInObject;

    const user = await User.findById(tokenDataInObject);

    if (!user) {
      return res.status(400).json({ message: "User not found in database" });
    }
    req.user = user;

    //if the user is found simply call the next();
    next();
  } catch (err) {
    res.send("The error occured here is given" + err.message);
  }

  //find the user in the database
};

module.exports = { userAuth };
