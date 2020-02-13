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


//create order
router.post("/", addOrder);
// client update his order
router.put("/:orderId", authGuardClient, updateOrder);
//change order status: 
router.patch("/:orderId/clients/:clientId", authGuardClient, updateOrderStatusByClient);
router.patch("/:orderId/businesses/:businessId", authGuardBusiness, updateOrderStatusByBusiness);
// business get all new orders ||business get all his orders ||client get all his orders
router.get("/", authGuardBusiness, getAllOrders);
// client gets his order || business get his order
router.get("/:orderId", getOrder);


module.exports = router;
