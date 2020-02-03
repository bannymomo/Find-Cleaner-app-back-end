const express = require("express");
const clientRoute = require("./routes/client");

const router = express.Router();
router.use("/clients", clientRoute);

module.exports = router;
