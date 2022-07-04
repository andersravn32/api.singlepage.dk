const express = require("express");
const router = express.Router();
const check = require("../../../middleware/check");

// Get all blogposts
router.get("/", require("./readBlogPosts"));

// Create new blogpost
router.post("/create",check.auth, check.admin,require("./createBlogPost"));

module.exports = router;