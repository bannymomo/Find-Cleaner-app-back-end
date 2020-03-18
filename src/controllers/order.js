const Order = require("../models/order");
const Client = require("../models/client");
const Business = require("../models/business");
const responseFormatter = require("../utils/responseFormatter");
const checkId = require("../utils/idCheck");

const { convertQuery } = require("../utils/helper");

const {
  NEW_ORDER,
  CANCELLED_BY_CLIENT,
  ACCEPTED,
  CANCELLED_BY_BUSINESS,
  DONE,
  CLIENT_ROLE,
  BUSINESS_ROLE
} = require("../utils/variables");

async function addOrder(req, res) {
  const {
    bedrooms,
    bathrooms,
    endOfLease,
    oven,
    windows,
    cabinets,
    carpet,
    postDate,
    dueDate,
    location,
    description
  } = req.body;
  const order = new Order({
    bedrooms,
    bathrooms,
    endOfLease,
    oven,
    windows,
    cabinets,
    carpet,
    postDate,
    dueDate,
    location,
    description
  });
  const { clientId } = req.query;
  const client = await Client.findById(clientId).exec();

  checkId(client, req, res);
  if (res.statusCode === 401 || res.statusCode === 404) {
    return;
  }

  client.orders.addToSet(order._id);
  order.client = client._id;
  await order.save();
  client.orders.addToSet(order._id);
  await client.save();
  return responseFormatter(res, 200, null, order);
}

async function getOrderById(req, res) {
  const { orderId } = req.params;
  const order = await Order.findById(orderId)
    .sort({ postDate: 1 })
    .populate("business client")
    .exec();
  if (!order) {
    return responseFormatter(res, 404, "Order not found", null);
  }
  if (req.user.role === CLIENT_ROLE) {
    const client = order.client;
    checkId(client, req, res);
    if (res.statusCode === 401 || res.statusCode === 404) return;
  } else if (req.user.role === BUSINESS_ROLE) {
    if (order.status === NEW_ORDER) {
      return responseFormatter(res, 200, null, order);
    }
    const business = order.business;
    checkId(business, req, res);
    if (res.statusCode === 401 || res.statusCode === 404) return;
  }

  return responseFormatter(res, 200, null, order);
}

async function getAllOrders(req, res) {
  //sort=postDate -postDatenew
  const total = await Order.find({ status: NEW_ORDER })
    .countDocuments()
    .exec();
  const { pagination, sort } = convertQuery(req.query, total);
  const { page, pageSize } = pagination;

  const ordersList = await Order.find({ status: NEW_ORDER })
    .sort(sort)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec();

  return responseFormatter(res, 200, null, { data: ordersList, pagination });
}

async function updateOrderById(req, res) {
  const { orderId } = req.params;
  const {
    bedrooms,
    bathrooms,
    endOfLease,
    oven,
    windows,
    cabinets,
    carpet,
    postDate,
    dueDate,
    location,
    description
  } = req.body;

  const fields = {
    bedrooms,
    bathrooms,
    endOfLease,
    oven,
    windows,
    cabinets,
    carpet,
    postDate,
    dueDate,
    location,
    description
  };
  const order = await Order.findById(orderId).exec();
  if (!order) {
    return responseFormatter(res, 404, "Order not found", null);
  }
  const client = await Client.findById(order.client);
  checkId(client, req, res);
  if (res.statusCode === 401 || res.statusCode === 404) return;

  Object.keys(fields).forEach(key => {
    if (fields[key] !== undefined) {
      order[key] = fields[key];
    }
  });
  await order.save();
  return responseFormatter(res, 200, null, order);
}

async function updateOrderStatusByClient(req, res) {
  const { orderId, clientId } = req.params;
  const { status } = req.query;
  const order = await Order.findById(orderId)
    .populate("client")
    .exec();
  if (!order) {
    return responseFormatter(res, 404, "Order not found", null);
  }

  const client = await Client.findById(clientId).exec();
  checkId(client, req, res);
  if (res.statusCode === 401 || res.statusCode === 404) return;
  if (order.client.user.toString() !== req.user.id) {
    return responseFormatter(res, 401, "Access denied", null);
  }

  if (
    (order.status === NEW_ORDER && status === CANCELLED_BY_CLIENT) ||
    (order.status === ACCEPTED && status === DONE)
  ) {
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
  checkId(business, req, res);
  if (res.statusCode === 401 || res.statusCode === 404) return;
  const order = await Order.findById(orderId)
    .populate("business")
    .exec();
  if (!order) {
    return responseFormatter(res, 404, "Order not found", null);
  }

  if (order.status === NEW_ORDER && status === ACCEPTED) {
    order.status = status;
    business.orders.addToSet(orderId);
    order.business = businessId;
    await order.save();
    await business.save();
    return responseFormatter(res, 200, null, order);
  } else if (order.status === ACCEPTED && status === CANCELLED_BY_BUSINESS) {
    if (order.business.user.toString() !== req.user.id) {
      return responseFormatter(res, 401, "Access denied", null);
    }
    order.status = status;
    await order.save();
    return responseFormatter(res, 200, null, order);
  } else {
    return responseFormatter(res, 400, "Cannot change order status", null);
  }
}

async function addOrderComment(req, res) {
  const { orderId } = req.params;
  const { comment } = req.body;
  const order = await Order.findById(orderId)
    .populate("client")
    .exec();
  if (!order) {
    return responseFormatter(res, 404, "Order not found", null);
  }
  if (order.status !== DONE) {
    return responseFormatter(res, 400, "Order not finish yet", null);
  }
  const client = order.client;
  checkId(client, req, res);
  if (res.statusCode === 401 || res.statusCode === 404) return;
  order.comment = comment;
  await order.save();
  return responseFormatter(res, 200, null, order);
}

module.exports = {
  addOrder,
  getOrderById,
  getAllOrders,
  updateOrderById,
  updateOrderStatusByClient,
  updateOrderStatusByBusiness,
  addOrderComment
};
