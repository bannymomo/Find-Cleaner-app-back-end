const express = require("express");
const clientRoute = require("./routes/client");
const businessRoute = require("./routes/business");
const orderRoute = require("./routes/order");
const userRoute = require("./routes/user");

const router = express.Router();
router.use("/clients", clientRoute);
router.use("/businesses", businessRoute);
router.use("/orders", orderRoute);
router.use("/users", userRoute);

module.exports = router;
