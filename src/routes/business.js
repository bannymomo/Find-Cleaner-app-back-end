const express = require("express");
const router = express.Router();
const {
  addBusiness,
  getBusiness,
  getAllBusinesses,
  updateBusiness,
  deleteBusiness
} = require("../controllers/business");

router.get("/", getAllBusinesses);
router.get("/:businessId", getBusiness);
router.post("/", addBusiness);
router.put("/:businessId", updateBusiness);
router.delete("/:businessId", deleteBusiness);

module.exports = router;
