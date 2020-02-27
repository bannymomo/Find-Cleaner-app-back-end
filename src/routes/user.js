const express = require("express");
const router = express.Router();
const { addUser, updateUser, getSelf } = require("../controllers/user");
const { authGuard } = require("../middleware/authGuard");

router.post("/", addUser);
router.put("/:userId", authGuard, updateUser);
router.get("/me", authGuard, getSelf);

module.exports = router;
