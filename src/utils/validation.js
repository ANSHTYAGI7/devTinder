const validator = require("validator");

const userSignupValidation = (req) => {
  const { firstName } = req.body;

  if (!firstName) {
    throw new Error("Enter FirstName");
  }
};

module.exports = { userSignupValidation };
