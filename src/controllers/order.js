const Order = require("../models/order");
const Client = require("../models/client");
async function addOrder(req, res) {
  //订单由用户创建，订单对用户即1对1关系，路径中传用户id，订单与用户双向绑定关系，
  //创建时,用户未撤单clientWithdraw为false，商家未接单businessHandle为false，
  //商家未退单，businessWithdraw为false
  const {
    visible,
    clientWithdraw,
    businessHandle,
    businessWithdraw,
    postBy,
    postDate,
    location,
    budget,
    price,
    dueDate,
    description,
    orderConfirmed,
    projectCompleted,
    orderEvaluation
  } = req.body;
  const order = new Order({
    visible,
    clientWithdraw,
    businessHandle,
    businessWithdraw,
    postBy,
    postDate,
    location,
    budget,
    price,
    dueDate,
    description,
    orderConfirmed,
    projectCompleted,
    orderEvaluation
  });
  const { clientId } = req.params;
  const client = await Client.findById(clientId);
  if (!client) {
    return res.status(404).json("client not found");
  }
  client.orders.addToSet(order._id);
  order.client = client._id;
  await order.save();
  await client.save();
  return res.json(order);
}

async function getOrder(req, res) {
  const { orderId } = req.params;
  const order = await Order.findById(orderId)
    .populate("client")
    .exec();
  if (!order) {
    return res.status(404).json("order not found");
  }
  return res.json(order);
}

async function getAllOrders(req, res) {
  const orders = await Order.find().exec();
  return res.json(orders);
}

async function updateOrder(req, res) {
  const { orderId } = req.params;
  const {
    visible,
    clientWithdraw,
    businessHandle,
    businessWithdraw,
    postBy,
    postDate,
    location,
    budget,
    price,
    dueDate,
    description,
    orderConfirmed,
    projectCompleted,
    orderEvaluation
  } = req.body;

  const fields = {
    visible,
    clientWithdraw,
    businessHandle,
    businessWithdraw,
    postBy,
    postDate,
    location,
    budget,
    price,
    dueDate,
    description,
    orderConfirmed,
    projectCompleted,
    orderEvaluation
  };
  const order = await Order.findById(orderId);

  Object.keys(fields).forEach(key => {
    if (fields[key] !== undefined) {
      order[key] = fields[key];
    }
  });
  await order.save();
  return res.json(order);
}
async function deleteOrder(req, res) {
  //仅用于测试，真实情况下不会删除用户的操作记录，
  //路径中传用户id和订单id，删除订单的时候同时双向取消用户和订单的关系，
  //此部分暂时不考虑商家接单，不绑定
  const { orderId, clientId } = req.params;
  const client = await Client.findById(clientId).exec();
  const order = await Order.findByIdAndDelete(orderId).exec();
  if (!client || !order) {
    return res.status(404).json("client or order not found");
  }
  const oldCount = client.orders.length;
  client.orders.pull(order._id);
  order.client = null; //（订单已经不存在了，单方面取消用户和订单的关系也ok）
  if (oldCount === client.orders.length) {
    return res.status(404).json("Enrollment does not exist");
  }
  await client.save();
  return res.json(order);
}

module.exports = {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
};
