const Client = require("../models/client");
const User = require("../models//user");
const responseFormatter = require("../utils/responseFormatter");

async function addClient(req, res) {
  const {
    firstName,
    lastName,
    gender,
    age,
    email,
    postcode,
    memberSince,
    lastOnline,
    photo,
    description
  } = req.body;

  const client = new Client({
    firstName,
    lastName,
    gender,
    age,
    email,
    postcode,
    memberSince,
    lastOnline,
    photo,
    description
  });
  const user = await User.findById(req.user.id).exec();
  if (user.client) {
    return responseFormatter(
      res,
      400,
      "Client cannot be registered twice with the same username",
      null
    );
  }
  client.user = req.user.id;
  await client.save();
  user.client = client._id;
  await user.save();
  return responseFormatter(res, 200, null, client);
}

async function getClient(req, res) {
  const { clientId } = req.params;
  const client = await Client.findById(clientId)
    .populate("orders user")
    .exec();
  if (!client) {
    return responseFormatter(res, 404, "client not found", null);
  }
  if (client.user._id.toString() !== req.user.id) {
    //客户信息只允许客户本人获取，如果client的userID即user注册ID与token里面携带的id不相符，代表不是本人操作，不允许访问资料）
    return responseFormatter(res, 401, "No permission to read", null);
  }

  return responseFormatter(res, 200, null, client);
}

async function updateClient(req, res) {
  const { clientId } = req.params;
  const {
    firstName,
    lastName,
    gender,
    age,
    email,
    postcode,
    memberSince,
    lastOnline,
    photo,
    description
  } = req.body;

  const fields = {
    firstName,
    lastName,
    gender,
    age,
    email,
    postcode,
    memberSince,
    lastOnline,
    photo,
    description
  };
  const client = await Client.findById(clientId);
  if (!client) {
    return responseFormatter(res, 404, "client not found", null);
  }

  if (client.user.toString() !== req.user.id) {
    //如果client的userID即user注册ID与token里面携带的id不相符，代表不是本人操作，不允许修改）
    return responseFormatter(res, 401, "No permission to change", null);
  }
  Object.keys(fields).forEach(key => {
    if (fields[key] !== undefined) {
      client[key] = fields[key];
    }
  });
  await client.save();
  return responseFormatter(res, 200, null, client);
}

module.exports = {
  addClient,
  getClient,
  updateClient
};
