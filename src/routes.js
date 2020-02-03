const express = require("express");
const clientRoute = require("./routes/client");
const businessRoute = require("./routes/business");

const router = express.Router();
router.use("/businesses", businessRoute);

module.exports = router;
