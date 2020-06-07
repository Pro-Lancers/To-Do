var jwt = require("jsonwebtoken");
const config = require("../config");

const secret = config.jwtSecret;

const generateToken = (id,email) => {
  const payload = {
    id,
    email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, //1hr
  };
  return jwt.sign(payload, secret);
};

const verifyToken = async (token) => jwt.verify(token, secret);

module.exports = {
  generateToken,
  verifyToken,
};
