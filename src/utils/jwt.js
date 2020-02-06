const jwt = require("jsonwebtoken");

function generateToken({ id, role }) {
  const token = jwt.sign({ id, role }, process.env.JWT_KEY, {
    expiresIn: "1h"
  });
  return token;
}

function validateToken(token) {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_KEY);
  } catch (e) {
    return null;
  }
  return decoded;
}

module.exports = { generateToken, validateToken };
