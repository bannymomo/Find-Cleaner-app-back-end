const express = require("express");
const router = express.Router();
const { authGuardBusiness } = require("../middleware/authGuard");
const {
  addBusiness,
  getBusiness,
  getAllBusinesses,
  updateBusiness,
  deleteBusiness,
  addOrderToBusiness
} = require("../controllers/business");

router.get("/", getAllBusinesses); //admin
router.get("/:businessId", getBusiness);
router.post("/", authGuardBusiness, addBusiness);
router.put("/:businessId", authGuardBusiness, updateBusiness);
router.delete("/:businessId", authGuardBusiness, deleteBusiness);
router.put(
  "/:businessId/orders/:orderId",
  authGuardBusiness,
  addOrderToBusiness
);

module.exports = router;
