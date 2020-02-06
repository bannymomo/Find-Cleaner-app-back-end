const express = require("express");
const router = express.Router();
const {
  authGuardBusiness,
  authGuardClient
} = require("../middleware/authGuard");
const {
  addClient,
  getClient,
  getAllClients,
  updateClient,
  deleteClient,
  clientDeleteOrder
} = require("../controllers/client");

router.get("/", getAllClients); //admin
router.get("/:clientId", getClient);
router.post("/", authGuardClient, addClient);
router.put("/:clientId", authGuardClient, updateClient);
router.delete("/:clientId", authGuardClient, deleteClient);
router.put("/:clientId/orders/:orderId", authGuardClient, clientDeleteOrder);

module.exports = router;
