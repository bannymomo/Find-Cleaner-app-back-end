const express = require("express");
const router = express.Router();
const { authGuardBusiness } = require("../middleware/authGuard");
const {
  addBusiness,
  getBusinessById,
  getAllBusinesses,
  updateBusinessById,
  getHisOrders,
  updateAvatar
} = require("../controllers/business");
const { uploadImage } = require('../utils/upload');

router.get("/", getAllBusinesses);
router.get("/:businessId", getBusinessById);
router.post("/", authGuardBusiness, addBusiness);
router.put("/:businessId", authGuardBusiness, updateBusinessById);
router.get("/:businessId/orders", authGuardBusiness, getHisOrders);
router.put(
  "/:businessId/avatar",
  authGuardBusiness,
  uploadImage.single("avatar"),
  updateAvatar
)

module.exports = router;
