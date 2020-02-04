const Order = require("../models/order");
async function addOrder(req, res) {
  const {
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
  await order.save();
  return res.json(order);
}

async function getOrder(req, res) {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).exec();
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
  const { orderId } = req.params;
  const order = await Order.findByIdAndDelete(orderId).exec();
  if (!order) {
    return res.status(404).json("order not found");
  }
  return res.status(200).json(order);
}

module.exports = {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
};
