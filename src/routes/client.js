const express = require("express");
const router = express.Router();
const {
  addClient,
  getClient,
  getAllClients,
  updateClient,
  deleteClient
} = require("../controllers/client");

router.get("/", getAllClients);
router.get("/:clientId", getClient);
router.post("/", addClient);
router.put("/:clientId", updateClient);
router.delete("/:clientId", deleteClient);

module.exports = router;
