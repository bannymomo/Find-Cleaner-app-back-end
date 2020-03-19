const express = require("express");
const router = express.Router();
const { authGuardClient } = require("../middleware/authGuard");
const {
    addClient,
    getClientById,
    updateClientById,
    getHisOrders,
    updateAvatar
} = require("../controllers/client");
const { uploadImage } = require("../utils/upload");

router.get("/:clientId", getClientById);
router.post("/", authGuardClient, addClient);
router.put("/:clientId", authGuardClient, updateClientById);
router.get("/:clientId/orders", authGuardClient, getHisOrders);
router.put(
    "/:clientId/avatar",
    authGuardClient,
    uploadImage.single("avatar"),
    updateAvatar
);

module.exports = router;
