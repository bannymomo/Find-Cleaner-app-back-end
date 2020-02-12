const Business = require("../models/business");
const Order = require("../models/order");
const User = require("../models/user");
const responseFormatter = require("../utils/responseFormatter");
async function addBusiness(req, res) {
  const {
    businessName,
    address,
    email,
    postcode,
    telephoneNumber,
    ABNNumber,
    memberSince,
    lastOnline,
    photo,
    description
  } = req.body;
  const business = new Business({
    businessName,
    address,
    email,
    postcode,
    telephoneNumber,
    ABNNumber,
    memberSince,
    lastOnline,
    photo,
    description
  });
  const user = await User.findById(req.user.id).exec();
  if (user.business) {
    return responseFormatter(
      res,
      400,
      "Business cannot be registered twice with the same username",
      null
    );
  }
  business.user = req.user.id;
  await business.save();
  user.business = business._id;
  await user.save();
  return responseFormatter(res, 200, null, business);
}

async function getBusiness(req, res) {
  const { businessId } = req.params;
  const business = await Business.findById(businessId)
    .populate("orders user")
    .exec();
  if (!business) {
    return responseFormatter(res, 404, "business not found", null);
  }
  return responseFormatter(res, 200, null, business);
}

async function getAllBusinesses(req, res) {
  const businesses = await Business.find().exec();
  return responseFormatter(res, 200, null, businesses);
}

async function updateBusiness(req, res) {
  const { businessId } = req.params;
  const {
    businessName,
    address,
    email,
    postcode,
    telephoneNumber,
    ABNNumber,
    memberSince,
    lastOnline,
    photo,
    description
  } = req.body;

  const fields = {
    businessName,
    address,
    email,
    postcode,
    telephoneNumber,
    ABNNumber,
    memberSince,
    lastOnline,
    photo,
    description
  };
  const business = await Business.findById(businessId).exec();
  if (!business) {
    return responseFormatter(res, 404, "business not found", null);
  }

  if (business.user.toString() !== req.user.id) {
    //如果business的userID即user注册ID与token里面携带的id不相符，代表不是本人操作，不允许修改）
    return responseFormatter(res, 401, "No permission to change", null);
  }

  Object.keys(fields).forEach(key => {
    if (fields[key] !== undefined) {
      business[key] = fields[key];
    }
  });

  await business.save();
  return responseFormatter(res, 200, null, business);
}

async function getHisOrders(req, res) {
  const { businessId } = req.params;
  const { status } = req.query;
  const business = await Business.findById(businessId).exec();
  if (!business) {
    return responseFormatter(res, 404, "client not found", null);
  }
  const orders = await Order.find().exec();
  let ordersList = orders.filter(order => order.business);
  ordersList = ordersList.filter(order => order.business.toString() === businessId);
  if ( status ) {
    ordersList = ordersList.filter(order => order.status === status);
  }
  return responseFormatter(res, 200, null, ordersList);
}

module.exports = {
  addBusiness,
  getBusiness,
  getAllBusinesses,
  updateBusiness,
  getHisOrders
};
