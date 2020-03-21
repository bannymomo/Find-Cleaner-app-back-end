const express = require("express");
const router = express.Router();
const { authGuardBusiness, authGuard } = require("../middleware/authGuard");
const {
  addBusiness,
  getBusinessById,
  getAllBusinesses,
  updateBusinessById,
  getHisOrders,
  updateAvatar
} = require("../controllers/business");
const { uploadImage } = require("../utils/upload");

router.get("/", getAllBusinesses);
router.get("/:businessId", authGuard, getBusinessById);
router.post("/", authGuard, authGuardBusiness, addBusiness);
router.put("/:businessId", authGuard, authGuardBusiness, updateBusinessById);
router.get("/:businessId/orders", authGuard, authGuardBusiness, getHisOrders);
router.put(
  "/:businessId/avatar",
  authGuard,
  authGuardBusiness,
  uploadImage.single("avatar"),
  updateAvatar
);

module.exports = router;
