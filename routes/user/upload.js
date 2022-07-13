const multer = require("multer");
const path = require("path");
const express = require("express");
const router = express.Router();
const check = require("../../middleware/check");
const { status, compose } = require("../../utilities/composer");
const { ObjectId } = require("mongodb");

const database = require("../../utilities/database");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./content/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.user._id}_${file.fieldname}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    return cb(null, true);
  }
  return cb(null, false);
};

const limits = {
  fileSize: 5000000,
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

router.post("/", check.auth, upload.single("avatar"), async (req, res) => {
  // Check for file upload
  if (!req.file) {
    return res.json(compose(status.UPLOAD.FAILED));
  }

  try {
    // Connect to database
    await database.connect();
    const db = database.db("singlepage");

    // Update profile field on user
    const query = await db.collection("users").updateOne(
      { _id: ObjectId(req.user._id) },
      {
        $set: {
          picture: `https://127.0.0.1:4000/${req.file.path}`,
        },
      }
    );

    // If no user was found, return and error
    if (!query.matchedCount) {
      return res.json(compose(status.UPLOAD.FAILED));
    }

    database.close();

    // Return success if user was found
    return res.json(compose(status.UPLOAD.SUCCESS, req.file));

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
