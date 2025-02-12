const express = require("express");

const connectionRequestRoutes = express.Router();
const connectionrequestController = require("../controllers/connectionRequestController");
const { userAuth } = require("../middlewares/auth");

connectionRequestRoutes.post(
  "/sendConnectionRequestToUsers",
  userAuth,
  connectionrequestController.connectionRequest
);

module.exports = connectionRequestRoutes;
