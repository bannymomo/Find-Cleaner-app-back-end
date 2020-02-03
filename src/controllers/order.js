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
function getOrder(req, res) {}
async function getAllOrders(req, res) {
  const orders = await Order.find().exec();
  return res.json(orders);
}
function updateOrder(req, res) {}
function deleteOrder(req, res) {}

module.exports = {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
};
