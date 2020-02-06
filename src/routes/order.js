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
  deleteOrder
} = require("../controllers/order");

router.get("/", authGuardBusiness, getAllOrders);
router.get("/:orderId", getOrder);
router.put("/:orderId", authGuardClient, updateOrder);
router.post("/clients/:clientId", authGuardClient, addOrder);
router.delete("/:orderId/clients/:clientId", authGuardClient, deleteOrder);

module.exports = router;
