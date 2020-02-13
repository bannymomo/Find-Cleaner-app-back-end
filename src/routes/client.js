const express = require("express");
const router = express.Router();
const { authGuardClient } = require("../middleware/authGuard");
const { 
  addClient, 
  getClient, 
  updateClient, 
  getHisOrders 
} = require("../controllers/client");

router.get("/:clientId", getClient);
router.post("/", authGuardClient, addClient);
router.put("/:clientId", authGuardClient, updateClient);
router.get("/:clientId/orders", authGuardClient, getHisOrders);

module.exports = router;
