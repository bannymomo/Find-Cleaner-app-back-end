const Order = require("../models/order");
const Client = require("../models/client");
const Business = require("../models/business");
const responseFormatter = require("../utils/responseFormatter");
async function addOrder(req, res) {
  //订单由用户创建，订单对用户即1对1关系，路径中传用户id，订单与用户双向绑定关系，
  //创建时 status : new
  const {
    bedrooms,
    bathrooms,
    postDate,
    location,
    description
  } = req.body;
  const order = new Order({
    bedrooms,
    bathrooms,
    postDate,
    location,
    description
  });
  const { clientId } = req.query;
  const client = await Client.findById(clientId);
  if (!client) {
    return responseFormatter(res, 404, "Client not found", null);
  }
  if (client.user.toString() !== req.user.id) {
    return responseFormatter(res, 404, "Access denied", null);
  }
  client.orders.addToSet(order._id);
  order.client = client._id;
  await order.save();
  await client.save();
  return responseFormatter(res, 200, null, order);
}

async function getOrder(req, res) {
  const { orderId } = req.params;
  const order = await Order.findById(orderId)
    .populate("business client")
    .exec();
  if (!order) {
    return responseFormatter(res, 404, "Order not found", null);
  }
  return responseFormatter(res, 200, null, order);
}

async function getAllOrders(req, res) {
  const orders = await Order.find().exec();
  
  const ordersList = orders.filter(order => order.status === "new");
  return responseFormatter(res, 200, null, ordersList);
}

async function updateOrder(req, res) {
  const { orderId } = req.params;
  const {
    bedrooms,
    bathrooms,
    postDate,
    location,
    description
  } = req.body;

  const fields = {
    bedrooms,
    bathrooms,
    postDate,
    location,
    description
  };
  const order = await Order.findById(orderId).exec();
  // could be done by front-end?
  if (!order) {
    return responseFormatter(res, 404, "Order not found", null);
  }

  Object.keys(fields).forEach(key => {
    if (fields[key] !== undefined) {
      order[key] = fields[key];
    }
  });
  await order.save();
  return responseFormatter(res, 200, null, order);
}

async function updateOrderStatusByClient(req, res) {
  const { orderId } = req.params;
  const { status } = req.query;
  const order = await Order.findById(orderId).exec();

  if (!order) {
    return responseFormatter(res, 404, "Order not found", null);
  }

  if ((order.status === "new" && status ==="new")||(order.status === "new" && status ==="cancelledByClient")||(order.status === "accepted" && status ==="done")) {
    order.status = status;
    await order.save();
    return responseFormatter(res, 200, null, order);
  } else {
    return responseFormatter(res, 400, "Cannot change order status", null);
  }

}

async function updateOrderStatusByBusiness(req, res) {
  const { orderId, businessId } = req.params;
  const { status } = req.query;
  const business = await Business.findById(businessId).exec();
  if (!business) {
    return responseFormatter(res, 404, "Business not found", null);
  }
  const order = await Order.findById(orderId).exec();
  if (!order) {
    return responseFormatter(res, 404, "Order not found", null);
  }

  if (order.status === "new" && status === "accepted") {
    order.status = status;
    business.orders.addToSet(orderId);
    order.business = businessId;
    await order.save();
    await business.save();
    return responseFormatter(res, 200, null, order);
  } else if ( order.status === "accepted" && status === "cancelledByBusiness") {
    order.status = status;
    await order.save();
    return responseFormatter(res, 200, null, order);
  } else {
    return responseFormatter(res, 400, "Cannot change order status", null);
  }

}

module.exports = {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  updateOrderStatusByClient,
  updateOrderStatusByBusiness
};
