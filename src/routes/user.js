const express = require("express");
const router = express.Router();
const {
    addUser,
    updateUser,
    getSelf,
    checkUserName
} = require("../controllers/user");
const { authGuard } = require("../middleware/authGuard");

router.post("/", addUser);
router.put("/:userId", authGuard, updateUser);
router.get("/me", authGuard, getSelf);
router.post("/:username", checkUserName);

module.exports = router;
