const Order = require("../models/order");
const Client = require("../models/client");
const Business = require("../models/business");
const responseFormatter = require("../utils/responseFormatter");

async function addOrder(req, res) {
  const { postBy, location, budget, dueDate, description } = req.body;
  const order = new Order({
    postBy,
    location,
    budget,
    dueDate,
    description
  });
  const { clientId } = req.query;
  const client = await Client.findById(clientId);
  if (!client) {
    return responseFormatter(res, 404, "client not found", null);
  }
  if (client.user.toString() !== req.user.id) {
    return responseFormatter(res, 401, "No permission to add order", null);
  }
  order.client = client._id;
  await order.save();
  client.orders.addToSet(order._id);
  await client.save();
  return responseFormatter(res, 200, null, order);
}

async function getOrder(req, res) {
  const { orderId } = req.params;
  const order = await Order.findById(orderId)
    .populate("business client")
    .exec();
  if (!order) {
    return responseFormatter(res, 404, "order not found", null);
  }
  const client = order.client;
  const business = order.business;
  if (client.user.toString() === req.user.id) {
    return responseFormatter(res, 200, null, order);
  } else if (business && business.user.toString() === req.user.id) {
    return responseFormatter(res, 200, null, order);
  } else {
    return responseFormatter(res, 401, "No permission to get order", null);
  }
}

async function updateOrder(req, res) {
  const { orderId } = req.params;
  const order = await Order.findById(orderId)
    .populate("client")
    .exec();
  if (!order) {
    return responseFormatter(res, 404, "order not found", null);
  }
  if (order.client.user.toString() !== req.user.id) {
    return responseFormatter(res, 401, "No permission to update order", null);
  }
  const { postBy, location, budget, dueDate, description } = req.body;

  const fields = {
    postBy,
    location,
    budget,
    dueDate,
    description
  };

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
  const client = await Client.findById(clientId);
  if (!order || !client) {
    return responseFormatter(res, 404, "order or client not found", null);
  }
  if (
    order.client.user.toString() !== req.user.id || //订单不是该客户的单
    client.user.toString() !== req.user.id //非该客户本人操作
  ) {
    return responseFormatter(res, 401, "No permission to update order", null);
  }
  if (order.status === "new" && status === "cancelledByClient") {
    order.status = "cancelledByClient";
    await order.save();
    return responseFormatter(res, 200, null, order);
  }
  if (order.status === "accepted" && status === "done") {
    order.status = "done";
    await order.save();
    return responseFormatter(res, 200, null, order);
  } else {
    return responseFormatter(res, 400, "Wrong way to update order", null);
  }
}

async function updateOrderStatusByBusiness(req, res) {
  const { orderId, businessId } = req.params;
  const { status } = req.query;
  const order = await Order.findById(orderId).exec();
  const business = await Business.findById(businessId);
  if (!order || !business) {
    return responseFormatter(res, 404, "order or business not found", null);
  }
  if (business.user.toString() !== req.user.id) {
    //非该商家本人操作
    return responseFormatter(res, 401, "No permission to update order", null);
  }
  if (order.status === "new" && status === "accepted") {
    order.status = "accepted";
    order.business = business._id;
    await order.save();
    business.orders.addToSet(order._id);
    await business.save();
    return responseFormatter(res, 200, null, order);
  }
  if (order.status === "accepted" && status === "cancelledByBusiness") {
    order.status = "cancelledByBusiness";
    await order.save();
    return responseFormatter(res, 200, null, order);
  } else {
    return responseFormatter(res, 400, "Wrong way to update order", null);
  }
}

async function getOrdersByQuery(req, res) {
  const ObjectId = require("mongodb").ObjectID;
  const { clientId, businessId, status, budget } = req.query;
  const client = await Client.findById(clientId).exec();
  const business = await Business.findById(businessId).exec();
  if (client && client.user.toString() === req.user.id) {
    //必须输入clientId，且用户存在，且是当前使用者
    const queries = {
      client: ObjectId(clientId),
      status,
      budget
    };
    Object.keys(queries).forEach(key => {
      if (queries[key] === undefined) {
        delete queries[key];
      }
    });
    const result = await Order.find(queries);
    return responseFormatter(res, 200, null, result);
  }
  if (!business && req.user.role === "business") {
    //query中未输入用户id，但角色是商家，可以查看所有新订单
    const newOrdersResult = await Order.find({ status: "new" });
    return responseFormatter(res, 200, null, newOrdersResult);
  }
  if (business && business.user.toString() === req.user.id) {
    //必须输入businessId，且商家存在，且是当前使用者
    const queries = {
      business: ObjectId(businessId),
      status,
      budget
    };
    Object.keys(queries).forEach(key => {
      if (queries[key] === undefined) {
        delete queries[key];
      }
    });
    const result = await Order.find(queries);
    return responseFormatter(res, 200, null, result);
  }
  return responseFormatter(res, 401, "No permission to get order", null);
}
module.exports = {
  addOrder,
  getOrder,
  getOrdersByQuery,
  updateOrder,
  updateOrderStatusByClient,
  updateOrderStatusByBusiness
};
