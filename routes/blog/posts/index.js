const express = require("express");
const router = express.Router();
const check = require("../../../middleware/check");

// Get all blogposts
router.get("/", require("./getPost"));

// Get single blogpost
router.get("/:id", require("./getPosts"));

// Create new blogpost
router.post("/create", check.auth, check.admin, require("./createPost"));

// Update existing blogpost
router.put("/:id", check.auth, check.admin, require("./updatePost"));

// Delete existing blogpost
router.delete("/:id", check.auth, check.admin, require("./deletePost"));

module.exports = router;
