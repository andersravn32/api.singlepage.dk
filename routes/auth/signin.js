const { status, compose } = require("../../utilities/composer.js");
const { MongoClient, ObjectId } = require("mongodb");
const roles = require("../../utilities/roles.json");
const url = process.env.MONGO_STRING;
const client = new MongoClient(url);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
  
  // Validate email and password format
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json(compose(status.USER.SIGNIN.FAILED));
  }

  try {
    // Connect to database, use database "singlepage", select collection "users"
    await client.connect();
    const db = client.db("singlepage");

    const user = await db.collection("users").findOne({ email: email });
    
    // Validate that user object is present
    if (!user) {
      return res.json(compose(status.USER.SIGNIN.FAILED));
    }

    // Compare password between request input and stored input if user is found in db
    if (!(await bcrypt.compare(password, user.password))) {
      return res.json(compose(status.USER.SIGNIN.FAILED));
    }

    // Compare stored user role to roles banned object
    if (user.role.permissionLevel == roles.banned.permissionLevel) {
      return res.json(compose(status.USER.SIGNIN.BANNED));
    }

    // Generate an access token with short expiration
    const accessToken = jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });

    // Generate content for the remote token
    const token = {
      type: "refresh",
      data: {
        userId: user._id
      },
      callback: null,
    }

    // Generate a refresh token for the end user to refresh access token
    const refreshToken = jwt.sign(token, process.env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    // Replace refresh token with new token, or insert new token if none exists
    await db.collection("tokens").replaceOne(
      { userId: user._id },
      {
        userId: user._id,
        token: refreshToken,
      },
      {
        upsert: true,
      }
    );

    // Close database connection
    client.close();

    // Return refresh token and access token to end user
    return res.json(
      compose(status.USER.SIGNIN.SUCCESS, {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user
      })
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = signin;