const User = require("../models/user");
const responseFormatter = require("../utils/responseFormatter");
const { generateToken } = require("../utils/jwt");

async function loginUser(req, res) {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username }).exec();
  if (!existingUser) {
    return responseFormatter(res, 400, "Invalid username or password", null);
  }
  if (!(await existingUser.validatePassword(password))) {
    return responseFormatter(res, 400, "Invalid username or password", null);
  }

  const token = generateToken({
    id: existingUser._id,
    role: existingUser.role
  });
  return responseFormatter(res, 200, null, {
    userName: existingUser.username,
    userRole: existingUser.role,
    token
  });
}

module.exports = loginUser;
