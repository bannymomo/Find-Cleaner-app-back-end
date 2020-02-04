const Business = require("../models/business");
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
  const business = await Business.findById(businessId).exec();
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
  const { businessId } = req.params;
  const business = await Business.findByIdAndDelete(businessId).exec();
  if (!business) {
    return res.status(404).json("business not found");
  }
  return res.status(200).json(business);
}

module.exports = {
  addBusiness,
  getBusiness,
  getAllBusinesses,
  updateBusiness,
  deleteBusiness
};
