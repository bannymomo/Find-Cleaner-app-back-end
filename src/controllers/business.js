const Business = require("../models/business");
const Order = require("../models/order");
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
  await business.save();
  return res.json(business);
}

async function getBusiness(req, res) {
  const { businessId } = req.params;
  const business = await Business.findById(businessId)
    .populate("orders")
    .exec();
  if (!business) {
    return res.status(404).json("business not found");
  }
  return res.json(business);
}

async function getAllBusinesses(req, res) {
  const businesses = await Business.find().exec();
  return res.json(businesses);
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
  const business = await Business.findById(businessId);

  Object.keys(fields).forEach(key => {
    if (fields[key] !== undefined) {
      business[key] = fields[key];
    }
  });

  await business.save();
  return res.json(business);
}

async function deleteBusiness(req, res) {
  //仅用于测试，真实情况下不会删除商家，这里不与订单做绑定
  const { businessId } = req.params;
  const business = await Business.findByIdAndDelete(businessId).exec();
  if (!business) {
    return res.status(404).json("business not found");
  }
  return res.status(200).json(business);
}

//商家接单
async function addOrderToBusiness(req, res) {
  const { businessId, orderId } = req.params;
  const business = await Business.findById(businessId);
  const order = await Order.findById(orderId);
  if (!business || !order) {
    return res.status(404).json("business or order not found");
  }
  business.orders.addToSet(order._id);
  order.business = business._id;
  order.businessHandle = true;
  await order.save();
  await business.save();
  return res.json(business);
}

//商家退单 businessWithdraw设为true

module.exports = {
  addBusiness,
  getBusiness,
  getAllBusinesses,
  updateBusiness,
  deleteBusiness,
  addOrderToBusiness
};
