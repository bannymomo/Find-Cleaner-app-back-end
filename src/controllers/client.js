const mongoose = require("mongoose");
const Client = require("../models/client");
const Order = require("../models/order");
const User = require("../models//user");
const responseFormatter = require("../utils/responseFormatter");
const checkId = require("../utils/idCheck");

const { convertQuery } = require("../utils/helper");
const { deleteImage } =require("../utils/upload");

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
  if (res.statusCode === 401 || res.statusCode === 404) {
    return;
  }

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
  const client = await Client.findById(clientId).exec();
  checkId(client, req, res);
  if (res.statusCode === 401 || res.statusCode === 404) return;

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
  const client = await Client.findById(clientId).exec();
  checkId(client, req, res);
  if (res.statusCode === 401 || res.statusCode === 404) return;

  const { status } = req.query;
  const search = { status };

  Object.keys(search).forEach(key => {
    if (!search[key]) {
      delete search[key];
    }
  });

  const total = await Order.find({ client: mongoose.Types.ObjectId(clientId) }).find(search).countDocuments().exec();

  const { pagination, sort } = convertQuery(req.query, total);
  const { page, pageSize } = pagination;

  const ordersList = await Order.find({ client: mongoose.Types.ObjectId(clientId) }).find(search).sort(sort).skip((page-1) * pageSize).limit(pageSize);

  return responseFormatter(res, 200, null, {data: ordersList, pagination});
}

async function updateAvatar(req, res) {
  const { clientId } = req.params;
  if (!req.file) {
    return responseFormatter(res, 400, "Image missing");
  }
  const client = await Client.findById(clientId).exec();

  if (!client) {
    await deleteImage(req.file.key);
    return responseFormatter(res, 404, "Client not found")
  }
  if (!client.user || client.user._id.toString() !== req.user.id) {
    await deleteImage(req.file.key);
    return responseFormatter(res, 401, "Access denied")
  }

  client.photo = req.file.location;
  await client.save();

  return responseFormatter(res, 200, null, client.photo);
}

module.exports = {
  addClient,
  getClientById,
  updateClientById,
  getHisOrders,
  updateAvatar
};
