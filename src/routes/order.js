const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
} = require("../controllers/order");

router.get("/", getAllOrders);
router.get("/:orderId", getOrder);
router.put("/:orderId", updateOrder);
router.post("/clients/:clientId", addOrder);
router.delete("/:orderId/clients/:clientId", deleteOrder);

module.exports = router;
