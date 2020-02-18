const express = require("express");
const router = express.Router();
const { authGuardBusiness } = require("../middleware/authGuard");
const {
  addBusiness,
  getBusinessById,
  getAllBusinesses,
  updateBusinessById,
  getHisOrders
} = require("../controllers/business");

router.get("/", getAllBusinesses);
router.get("/:businessId", getBusinessById);
router.post("/", authGuardBusiness, addBusiness);
router.put("/:businessId", authGuardBusiness, updateBusinessById);
router.get("/:businessId/orders", authGuardBusiness, getHisOrders);

module.exports = router;
