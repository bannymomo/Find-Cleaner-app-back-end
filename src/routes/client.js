const express = require("express");
const router = express.Router();
const {
  authGuardBusiness,
  authGuardClient
} = require("../middleware/authGuard");
const { addClient, getClient, updateClient } = require("../controllers/client");

router.get("/:clientId", getClient);
router.post("/", authGuardClient, addClient);
router.put("/:clientId", authGuardClient, updateClient);

module.exports = router;
