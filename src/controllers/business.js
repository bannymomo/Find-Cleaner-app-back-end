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
function getBusiness(req, res) {}
async function getAllBusinesses(req, res) {
  const businesses = await Business.find().exec();
  return res.json(businesses);
}
function updateBusiness(req, res) {}
function deleteBusiness(req, res) {}

module.exports = {
  addBusiness,
  getBusiness,
  getAllBusinesses,
  updateBusiness,
  deleteBusiness
};
