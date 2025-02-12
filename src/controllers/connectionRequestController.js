exports.connectionRequest = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res.send("The Request is send by the user " + user.firstName);
  } catch (err) {
    res.send("The error occured here is given" + err.message);
  }
};
