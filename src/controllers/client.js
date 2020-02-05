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
    .populate(
      "orders",
      "postBy postDate location budget price dueDate description orderConfirmed projectCompleted orderEvaluation"
    )
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

async function deleteClient(req, res) {
  const { clientId } = req.params;
  const client = await Client.findByIdAndDelete(clientId).exec();
  if (!client) {
    return res.status(404).json("client not found");
  }
  return res.status(200).json(client);
}

async function addOrder(req, res) {
  const { clientId, orderId } = req.params;
  const client = await Client.findById(clientId).exec();
  const order = await Order.findById(orderId).exec();
  if (!client || !order) {
    return res.status(404).json("client or order not found");
  }
  client.orders.addToSet(order._id);
  order.client = client._id;
  await client.save();
  await order.save();
  return res.json(client);
}

async function deleteOrder(req, res) {
  const { clientId, orderId } = req.params;
  const client = await Client.findById(clientId).exec();
  const order = await Order.findById(orderId).exec();
  if (!client || !order) {
    return res.status(404).json("client or order not found");
  }
  const oldCount = client.orders.length;
  client.orders.pull(order._id);
  order.client = undefined;
  if (oldCount === client.orders.length) {
    return res.status(404).json("Enrollment does not exist");
  }
  await client.save();
  await order.save();
  return res.json(client);
}

module.exports = {
  addClient,
  getClient,
  getAllClients,
  updateClient,
  deleteClient,
  addOrder,
  deleteOrder
};
