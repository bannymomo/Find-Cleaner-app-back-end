const mongoose = require("mongoose");
const Business = require("../models/business");
const Order = require("../models/order");
const User = require("../models/user");
const responseFormatter = require("../utils/responseFormatter");
const checkId = require("../utils/idCheck");

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
  checkId(business, req, res);
  if (res.statusCode === 401||404 ) return;

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
  const { status, clientId, date } = req.query; // date = 1||-1
  const business = await Business.findById(businessId).exec();
  checkId(business, req, res);
  if (res.statusCode === 401||404 ) return;

  const search = { status, client: mongoose.ObjectId(clientId) };
  
  Object.keys(search).forEach(key => {
    if (!search[key]) {
      delete search[key];
    }
  });

  if (Object.keys(search).length === 0) {
    const ordersList = await Order.find({ business: mongoose.Types.ObjectId(businessId) }).sort({ postDate: date }).exec();
    return responseFormatter(res, 200, null, ordersList);
  }

 const ordersList = await Order.find({ business: mongoose.Types.ObjectId(businessId) }).find(search).sort({ postDate: date }).exec();

  return responseFormatter(res, 200, null, ordersList);
}

module.exports = {
  addBusiness,
  getBusiness,
  getAllBusinesses,
  updateBusiness,
  getHisOrders
};
