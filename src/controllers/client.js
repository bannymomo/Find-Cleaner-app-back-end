const mongoose = require("mongoose");
const Client = require("../models/client");
const Order = require("../models/order");
const User = require("../models//user");
const responseFormatter = require("../utils/responseFormatter");
const checkId = require("../utils/idCheck");

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

async function getClientById(req, res) {
  const { clientId } = req.params;
  const client = await Client.findById(clientId)
    .populate("orders user")
    .exec();
  checkId(client, req, res);
  return responseFormatter(res, 200, null, client);
}

async function updateClientById(req, res) {
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
  checkId(client, req, res);

  Object.keys(fields).forEach(key => {
    if (fields[key] !== undefined) {
      client[key] = fields[key];
    }
  });
  await client.save();
  return responseFormatter(res, 200, null, client);
}

async function getHisOrders(req, res) {
  const { clientId } = req.params;
  const { status, date } = req.query; // date = 1||-1
  const client = await Client.findById(clientId).exec();
  checkId(client, req, res);

  const search = { status };

  Object.keys(search).forEach(key => {
    if (!search[key]) {
      delete search[key];
    }
  });

  if (Object.keys(search).length === 0) {
    const ordersList = await Order.find({
      client: mongoose.Types.ObjectId(clientId)
    })
      .sort({ postDate: date })
      .exec();
    return responseFormatter(res, 200, null, ordersList);
  }
  const ordersList = await Order.find({
    client: mongoose.Types.ObjectId(clientId)
  })
    .find(search)
    .sort({ postDate: date })
    .exec();

  return responseFormatter(res, 200, null, ordersList);
}
module.exports = {
  addClient,
  getClientById,
  updateClientById,
  getHisOrders
};
