const express = require("express");
const clientRoute = require("./routes/client");
const businessRoute = require("./routes/business");
const orderRoute = require("./routes/order");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const commentRoute = require("./routes/comment");
const { authGuard } = require("./middleware/authGuard");

const router = express.Router();
router.use("/clients", authGuard, clientRoute);
router.use("/businesses", businessRoute);
router.use("/orders", authGuard, orderRoute);
router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/comments", commentRoute);

module.exports = router;
