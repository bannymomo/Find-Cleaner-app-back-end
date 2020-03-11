const User = require("../models/user");
const responseFormatter = require("../utils/responseFormatter");
const { generateToken } = require("../utils/jwt");

async function addUser(req, res) {
  const { username, password, role } = req.body;
  const existingUser = await User.findOne({ username }).exec();
  if (existingUser) {
    return responseFormatter(res, 400, "User already exist", null);
  }
  const user = new User({
    username,
    password,
    role
  });
  await user.hashPassword();
  await user.save();
  const token = generateToken({ id: user._id, role: user.role });
  return responseFormatter(res, 200, null, {
    userName: user.username,
    userRole: user.role,
    token
  });
}

async function updateUser(req, res) {
  const { userId } = req.params;
  const { oldPassword, newPassword, doublecheckPassword } = req.body;
  const existingUser = await User.findById(userId).exec();
  if (!existingUser) {
    return responseFormatter(res, 404, "user not found", null);
  }
  if (!(await existingUser.validatePassword(oldPassword))) {
    return responseFormatter(res, 400, "Invalid old password", null);
  }
  if (
    !newPassword ||
    !doublecheckPassword ||
    newPassword !== doublecheckPassword
  ) {
    return responseFormatter(
      res,
      400,
      "New passwords entered twice are inconsistent",
      null
    );
  }
  existingUser.password = newPassword;
  await existingUser.hashPassword();
  await existingUser.save();
  const token = generateToken({
    id: existingUser._id,
    role: existingUser.role
  });
  return responseFormatter(res, 200, null, {
    userId: existingUser._id,
    userName: existingUser.username,
    userRole: existingUser.role,
    token
  });
}

async function getSelf(req, res) {
  const user = await User.findById(req.user.id);
  return responseFormatter(res, 200, null, user);
}

async function checkUserName(req, res) {
  const { username } = req.params;
  const existingUser = await User.findOne({ username }).exec();
  if (existingUser) {
    return responseFormatter(res, 400, "User already exist", null);
  }
  return responseFormatter(res, 200, null, username);
}
module.exports = { addUser, updateUser, getSelf, checkUserName };
