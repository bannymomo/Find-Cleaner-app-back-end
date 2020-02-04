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
  const obj = {
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

  const result = [];
  for (const name in obj) {
    const value = obj[name];
    if (value !== undefined) {
      result.push({ [name]: value });
    }
  }

  let newBusiness;
  for (let i = 0; i < result.length; i++) {
    newBusiness = await Business.findByIdAndUpdate(businessId, result[i], {
      new: true
    }).exec();
    if (!newBusiness) {
      return res.status(404).json("business not found");
    }
  }
  return res.json(newBusiness);
}
function deleteBusiness(req, res) {}

module.exports = {
  addBusiness,
  getBusiness,
  getAllBusinesses,
  updateBusiness,
  deleteBusiness
};
