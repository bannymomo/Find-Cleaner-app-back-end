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
  await user.save();
  const token = generateToken({ id: user._id, role: user.role });
  return responseFormatter(res, 200, null, {
    userName: user.username,
    userRole: user.role,
    token
  });
}

async function getUser(req, res) {
  const { userId } = req.params;
  const user = await User.findById(userId).exec();
  if (!user) {
    return responseFormatter(res, 404, "User not found", null);
  }
  return responseFormatter(res, 200, null, user);
}

async function getAllUsers(req, res) {
  const users = await User.find().exec();
  return responseFormatter(res, 200, null, users);
}

async function updateUser(req, res) {
  const { userId } = req.params;
  const { username, password, client, business, role } = req.body;
  const fields = { username, password, client, business, role };
  const user = await User.findById(userId);
  if (!user) {
    return responseFormatter(res, 404, "user not found", null);
  }
  Object.keys(fields).forEach(key => {
    if (fields[key] !== undefined) {
      user[key] = fields[key];
    }
  });
  await user.save();
  return responseFormatter(res, 200, null, user);
}

module.exports = { addUser, getUser, getAllUsers, updateUser };
