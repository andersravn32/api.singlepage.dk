const express = require("express");
const router = express.Router();
const path = require("path");
const check = require("./middleware/check");

/* TODO
- Add route protection to /content route
- Add auth routes
*/

// top level routes

// Server static content from public directory
router.use("/public", express.static(path.join(__dirname, "/public")));

// Server static content from public directory
router.use("/content", express.static(path.join(__dirname, "/content")));

// Authentication route
router.use("/auth", require("./routes/auth"));

module.exports = router;