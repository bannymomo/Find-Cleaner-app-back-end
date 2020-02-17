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

//create order
router.post("/", authGuardClient, addOrder);
// client update his order
router.put("/:orderId", authGuardClient, updateOrderById);
//change order status:
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
// business get all new orders
router.get("/", authGuardBusiness, getAllOrders);
// client gets his order || business get his order
router.get("/:orderId", getOrderById);

module.exports = router;
