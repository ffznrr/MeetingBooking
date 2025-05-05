const jwt = require("jsonwebtoken");
const jwtcode = process.env.JWT_SECRET_KEY;

const sign = (password) => {
  return jwt.sign(password, jwtcode);
};

const verifyToken = (password) => {
  return jwt.verify(password, jwtcode);
};

module.exports = {
  sign,
  verifyToken,
};
