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
  const obj = {
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

  const result = [];
  for (const name in obj) {
    const value = obj[name];
    if (value !== undefined) {
      result.push({ [name]: value });
    }
  }

  let newOrder;
  for (let i = 0; i < result.length; i++) {
    newOrder = await Order.findByIdAndUpdate(orderId, result[i], {
      new: true
    }).exec();
    if (!newOrder) {
      return res.status(404).json("order not found");
    }
  }
  return res.json(newOrder);
}
function deleteOrder(req, res) {}

module.exports = {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
};
