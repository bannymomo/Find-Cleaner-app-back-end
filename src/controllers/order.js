const Order = require("../models/order");
async function addOrder(req, res) {
  const order = new Order({
    postBy: "banny",
    location: "brisbane",
    budget: 300,
    price: 400
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
