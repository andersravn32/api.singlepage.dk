const express = require("express");
const router = express.Router();

// Upload profile picture
router.use("/upload", require("./upload"));

module.exports = router;
