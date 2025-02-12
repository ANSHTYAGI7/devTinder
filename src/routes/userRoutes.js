const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController");
const { userAuth } = require("../middlewares/auth");

userRoute.post("/users", userController.userSignup);

userRoute.post("/login", userController.userLogin);

userRoute.get("/profile", userAuth, userController.userProfile);

userRoute.get("/users", userController.allUserProfile);

userRoute.patch("/users/:userId", userAuth, userController.updateUser);

userRoute.delete("/user", userController.deleteUser);

module.exports = userRoute;
