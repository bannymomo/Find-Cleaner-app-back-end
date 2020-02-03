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
router.post("/", addOrder);
router.put("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder);

module.exports = router;
