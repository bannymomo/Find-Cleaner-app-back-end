const express = require("express");
const router = express.Router();
const { addUser, updateUser } = require("../controllers/user");
const { authGuard } = require("../middleware/authGuard");

router.post("/", addUser);
router.put("/:userId", authGuard, updateUser);

module.exports = router;
