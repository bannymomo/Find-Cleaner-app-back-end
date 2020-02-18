const express = require("express");
const router = express.Router();
const {
  authGuardBusiness,
  authGuardClient
} = require("../middleware/authGuard");
const {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  updateOrderStatusByClient,
  updateOrderStatusByBusiness
} = require("../controllers/order");

router.post("/", addOrder);
router.put("/:orderId", authGuardClient, updateOrder);
router.patch("/:orderId/clients/:clientId", authGuardClient, updateOrderStatusByClient);
router.patch("/:orderId/businesses/:businessId", authGuardBusiness, updateOrderStatusByBusiness);
router.get("/", authGuardBusiness, getAllOrders);
router.get("/:orderId", getOrder);

module.exports = router;
