const express = require("express");
const router = express.Router();
const {
  authGuardBusiness,
  authGuardClient
} = require("../middleware/authGuard");
const {
  addOrder,
  getOrderById,
  getAllOrders,
  updateOrderById,
  updateOrderStatusByClient,
  updateOrderStatusByBusiness
} = require("../controllers/order");

router.post("/", authGuardClient, addOrder);
router.put("/:orderId", authGuardClient, updateOrderById);
router.patch(
  "/:orderId/clients/:clientId",
  authGuardClient,
  updateOrderStatusByClient
);
router.patch(
  "/:orderId/businesses/:businessId",
  authGuardBusiness,
  updateOrderStatusByBusiness
);
router.get("/", authGuardBusiness, getAllOrders);
router.get("/:orderId", getOrderById);

module.exports = router;
