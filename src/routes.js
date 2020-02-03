const express = require("express");
const clientRoute = require("./routes/client");
const businessRoute = require("./routes/business");
const orderRoute = require("./routes/order");

const router = express.Router();
router.use("/clients", clientRoute);
router.use("/businesses", businessRoute);
router.use("/orders", orderRoute);

module.exports = router;
