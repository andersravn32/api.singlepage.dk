const { status, compose } = require("../../utilities/composer.js");
const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const url = process.env.MONGO_STRING;
const client = new MongoClient(url);

const refresh = async (req, res) => {

  // Fetch refreshToken from request body
  const refreshToken = req.body.token;
  // Check if refresh token is null
  if (refreshToken == null) {
    return res.json(compose(status.USER.REFRESH.FAILED));
  }

  try {
    // Connect to database, use database "singlepage", select collection "users"
    await client.connect();
    const db = client.db("singlepage");

    // Find token in database
    const token = await db
      .collection("tokens")
      .findOne({ token: refreshToken });

    if (!token) {
      return res.json(compose(status.USER.REFRESH.FAILED));
    }

    // Verify users refresh token
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      async (error, data) => {
        if (error) {
          // If JWT cannot be verified, remove it from database
          await db.collection("tokens").deleteOne({ token: refreshToken });
          return res.json(compose(status.USER.REFRESH.FAILED));
        }

        // reset issued at date, and exp. date
        delete data.iat;
        delete data.exp;

        const user = await db.collection("users").findOne({_id: ObjectId(data.data.userId)})

        // Generate an access token with short expiration
        const accessToken = jwt.sign(
          user,
          process.env.JWT_ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30m",
          }
        );
        client.close();

        // Return access token to end user
        return res.json(
          compose(status.USER.REFRESH.SUCCESS, {
            accessToken: accessToken,
            user: user
          })
        );
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = refresh;