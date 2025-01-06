const express = require("express");
const app = express();

const parseNumbermiddleware = (req, res, next) => {
  const { num1, num2 } = req.query;

  req.number1 = parseFloat(num1);
  req.number2 = parseFloat(num2);

  next();
};

app.get("/sum", parseNumbermiddleware, (req, res) => {
  const answer = req.number1 + req.number2;
  res.json({ answer });
});

app.listen(7777, () => {
  console.log("The Server has started");
});
