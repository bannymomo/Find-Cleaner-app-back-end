const Client = require("../models/client");
const Order = require("../models/order");
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
  await client.save();
  return responseFormatter(res, 200, null, client);
}

async function getClient(req, res) {
  const { clientId } = req.params;
  const client = await Client.findById(clientId)
    .populate("orders")
    .exec();
  if (!client) {
    return responseFormatter(res, 404, "client not found", null);
  }
  return responseFormatter(res, 200, null, client);
}

async function getAllClients(req, res) {
  const clients = await Client.find().exec();
  return responseFormatter(res, 200, null, clients);
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

  Object.keys(fields).forEach(key => {
    if (fields[key] !== undefined) {
      client[key] = fields[key];
    }
  });
  await client.save();
  return responseFormatter(res, 200, null, client);
}

//只用于测试，使用时不会删除用户信息，删除用户的同时删除用户下的全部订单，暂不考虑商家接单情况
async function deleteClient(req, res) {
  const { clientId } = req.params;
  const client = await Client.findByIdAndDelete(clientId).exec();
  if (!client) {
    return responseFormatter(res, 404, "client not found", null);
  }
  Order.deleteMany({ client: client._id }, function(error) {
    if (!error) {
      console.log("success");
    }
  });
  return responseFormatter(res, 200, null, client);
}

//用户点击按钮删除订单（把订单变为不可见状态）
async function clientDeleteOrder(req, res) {
  const { clientId, orderId } = req.params;
  const order = await Order.findById(orderId).exec();
  order.visible = false;
  await order.save();
  return responseFormatter(res, 200, null, order);
}

//用户方退单 clientWithdraw属性改为true

module.exports = {
  addClient,
  getClient,
  getAllClients,
  updateClient,
  deleteClient,
  clientDeleteOrder
};
