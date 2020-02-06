const express = require("express");
const router = express.Router();
const {
  addUser,
  getUser,
  getAllUsers,
  updateUser
} = require("../controllers/user");

router.post("/", addUser);
router.get("/", getAllUsers);
router.get("/:userId", getUser);
router.put("/:userId", updateUser);

module.exports = router;
