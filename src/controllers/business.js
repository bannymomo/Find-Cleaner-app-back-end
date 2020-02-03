const Business = require("../models/business");
async function addBusiness(req, res) {
  const business = new Business({
    businessName: "cleaner",
    address: "brisbane",
    email: "banny@126.com",
    postcode: 4120,
    telephoneNumber: 0420123425,
    ABNNumber: 1845378
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
