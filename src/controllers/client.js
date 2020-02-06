const Client = require("../models/client");
const Order = require("../models/order");

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
  return res.json(client);
}

async function getClient(req, res) {
  const { clientId } = req.params;
  const client = await Client.findById(clientId)
    .populate("orders")
    .exec();
  if (!client) {
    return res.status(404).json("client not found");
  }
  return res.json(client);
}

async function getAllClients(req, res) {
  const clients = await Client.find().exec();
  return res.json(clients);
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

  Object.keys(fields).forEach(key => {
    if (fields[key] !== undefined) {
      client[key] = fields[key];
    }
  });
  await client.save();
  return res.json(client);
}

//只用于测试，使用时不会删除用户信息，删除用户的同时删除用户下的全部订单，暂不考虑商家接单情况
async function deleteClient(req, res) {
  const { clientId } = req.params;
  const client = await Client.findByIdAndDelete(clientId).exec();
  if (!client) {
    return res.status(404).json("client not found");
  }
  Order.deleteMany({ client: client._id }, function(error) {
    if (!error) {
      console.log("success");
    }
  });
  return res.status(200).json(client);
}

//用户点击按钮删除订单（把订单变为不可见状态）
async function clientDeleteOrder(req, res) {
  const { clientId, orderId } = req.params;
  const order = await Order.findById(orderId).exec();
  order.visible = false;
  await order.save();
  return res.json(order);
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
