const { status, compose } = require("../../utilities/composer.js");
const { MongoClient } = require("mongodb");
const roles = require("../../utilities/roles.json");
const url = process.env.MONGO_STRING;
const client = new MongoClient(url);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const confirmations = require("../../utilities/confirmations.json");

/* 
TODO: 
- Add confirmation email when user has signed up and record has been inserted to db.
*/

// User template
const USER = {
  firstName: null,
  lastName: null,
  handle: null,
  email: null,
  password: null,
  role: roles.guest,
  profile: null,
  picture: null,
  signupTime: Math.round(Date.now()),
  referer: null,
  course: null,
  chapter: null,
};

// Handle signup method
const signup = async (req, res) => {

  // Interpolate base user with request body
  const user = {
    ...USER,
    ...req.body,
  };

  // Validate user object has values
  if (
    !user.firstName ||
    !user.lastName ||
    !user.handle ||
    !user.password ||
    !user.email ||
    !user.email.includes("@") ||
    !user.email.includes(".")
  ) {
    return res.json(compose(status.USER.SIGNUP.FAILED));
  }
  try {
    // Connect to database, use database "singlepage", select collection "users"
    await client.connect();
    const db = client.db("singlepage");

    // Find duplicates in database based on either handle or email
    const duplicate = await db.collection("users").findOne({
      $or: [
        {
          handle: user.handle,
        },
        {
          email: user.email,
        },
      ],
    });

    // Specify duplicate type and return error accordingly
    if (duplicate) {
      if (duplicate.email == user.email) {
        return res.json(compose(status.USER.SIGNUP.EMAIL_TAKEN));
      }

      if (duplicate.handle == user.handle) {
        return res.json(compose(status.USER.SIGNUP.HANDLE_TAKEN));
      }
    }

    // Create hashed version of user password
    user.password = await bcrypt.hash(user.password, 10);

    // Insert document to database
    const query = await db.collection("users").insertOne(user);

    // Handle case whereno document is inserted
    if (!query.insertedId) {
      return res.json(compose(status.USER.SIGNUP.FAILED));
    }

    // Generate JWT for confirming e-mail
    const token = jwt.sign(
      {
        type: confirmations.EMAIL.INIT,
        data: {
          userId: query.insertedId
        },
        callback: "http://127.0.0.1:3000",
      },
      process.env.JWT_CONFIRMATION_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    await db.collection("tokens").insertOne({
      userId: query.insertedId,
      token: token,
    });

    // Send confirmation e-mail to the end user, change this at a later date
    // TODO

    // Close database connection
    client.close();

    // Return signup status with new userid and request time
    return res.json(
      compose(status.USER.SIGNUP.SUCCESS, {
        id: query.insertedId,
      })
    );
  } catch (error) {
    console.log(error);
    return res.json(compose(status.ERROR.SERVER_CRITICAL));
  }
};

module.exports = signup;