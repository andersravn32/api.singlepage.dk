const { status, compose } = require("../../utilities/composer.js");
const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const url = process.env.MONGO_STRING;
const client = new MongoClient(url);

const signout = async (req, res) => {

  // Get refresh token from request body
  const refreshToken = req.body.token;
  
  // Check if refresh token is null
  if (refreshToken == null) {
    return res.json(compose(status.USER.SIGNOUT.FAILED));
  }

  try {
    await client.connect();
    const db = client.db("singlepage");

    // Query deletion order for refreshToken
    const query = await db.collection("tokens").deleteOne({ token: refreshToken });
    
    // Close database connection
    client.close();

    // Return correct status message to end user based on deletioncount
    if (query.deletedCount){
        return res.json(compose(status.USER.SIGNOUT.SUCCESS));
    }
    return res.json(compose(status.USER.SIGNOUT.FAILED));

  } catch (error) {
    console.log(error);
  }
};

module.exports = signout;