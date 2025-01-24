const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://AnshTyagi:tF3dYYY09X0Jzdyr@projectsample.wycec.mongodb.net/devTinder"
  );
};
module.exports = connectDb;
