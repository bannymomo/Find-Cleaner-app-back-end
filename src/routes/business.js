const express = require("express");
const router = express.Router();
const { authGuardBusiness } = require("../middleware/authGuard");
const {
  addBusiness,
  getBusiness,
  getAllBusinesses,
  updateBusiness
} = require("../controllers/business");

router.get("/", getAllBusinesses);
router.get("/:businessId", getBusiness);
router.post("/", authGuardBusiness, addBusiness);
router.put("/:businessId", authGuardBusiness, updateBusiness);

module.exports = router;
