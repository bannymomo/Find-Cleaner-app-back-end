const express = require("express");
const router = express.Router();
const {
  addClient,
  getClient,
  getAllClients,
  updateClient,
  deleteClient,
  addOrder,
  deleteOrder
} = require("../controllers/client");

router.get("/", getAllClients);
router.get("/:clientId", getClient);
router.post("/", addClient);
router.put("/:clientId", updateClient);
router.delete("/:clientId", deleteClient);
router.post("/:clientId/orders/:orderId", addOrder);
router.delete("/:clientId/orders/:orderId", deleteOrder);

module.exports = router;
