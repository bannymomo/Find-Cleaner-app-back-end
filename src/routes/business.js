const express = require("express");
const router = express.Router();
const { authGuardBusiness } = require("../middleware/authGuard");
const {
  addBusiness,
  getBusiness,
  getAllBusinesses,
  updateBusiness,
  getHisOrders
} = require("../controllers/business");

router.get("/", getAllBusinesses);
router.get("/:businessId", getBusiness);
router.post("/", authGuardBusiness, addBusiness);
router.put("/:businessId", authGuardBusiness, updateBusiness);
router.get("/:businessId/orders", getHisOrders);

module.exports = router;
