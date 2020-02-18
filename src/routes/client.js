const express = require("express");
const router = express.Router();
const { authGuardClient } = require("../middleware/authGuard");
const {
  addClient,
  getClientById,
  updateClientById,
  getHisOrders
} = require("../controllers/client");

router.get("/:clientId", getClientById);
router.post("/", authGuardClient, addClient);
router.put("/:clientId", authGuardClient, updateClientById);
router.get("/:clientId/orders", authGuardClient, getHisOrders);

module.exports = router;
