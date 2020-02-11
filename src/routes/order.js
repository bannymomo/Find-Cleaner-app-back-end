const express = require("express");
const router = express.Router();
const {
  authGuardBusiness,
  authGuardClient
} = require("../middleware/authGuard");
const {
  addOrder,
  getOrder,
  getOrdersByQuery,
  updateOrder,
  updateOrderStatusByClient,
  updateOrderStatusByBusiness
} = require("../controllers/order");

router.get("/", getOrdersByQuery);
router.get("/:orderId", getOrder);
router.put("/:orderId", authGuardClient, updateOrder);
router.post("/", authGuardClient, addOrder);
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

module.exports = router;
