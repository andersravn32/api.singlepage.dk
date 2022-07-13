const { status, compose } = require("../../utilities/composer.js");
const { ObjectId } = require("mongodb");
const confirmations = require("../../utilities/confirmations.json");
const jwt = require("jsonwebtoken");
const roles = require("../../utilities/roles.json");
const database = require("../../utilities/database");

const confirm = async (req, res) => {
  // Get token from request query
  const confirmationToken = req.query.token;
  if (!confirmationToken) {
    return res.json(compose(status.ERROR.NOT_ALLOWED));
  }

  // Decode and verify token
  try {
    // Connect to database
    await database.connect();
    const db = database.db("singlepage");

    // Find token in database
    const token = await db
      .collection("tokens")
      .findOne({ token: confirmationToken });
      
    if (!token) {
      return res.json(compose(status.ERROR.NOT_ALLOWED));
    }
    // Verify JWT validity
    const content = jwt.verify(
      token.token,
      process.env.JWT_CONFIRMATION_TOKEN_SECRET
    );

    // Check confirmation type
    switch (content.type) {

      // Initial e-mail confirmation
      case confirmations.EMAIL.INIT: {
        // Run update query on user
        const updateQuery = await db.collection("users").updateOne(
          { _id: ObjectId(content.data.userId) },
          {
            $set: {
              role: roles.member,
            },
          }
        );
        if (!updateQuery.modifiedCount) {
          return res.json(compose(status.ERROR.NOT_ALLOWED));
        }

        // Run deletion query on token
        const deleteQuery = await db
          .collection("tokens")
          .deleteOne({ token: confirmationToken });
        if (!deleteQuery.deletedCount) {
          return res.json(compose(status.ERROR.NOT_ALLOWED));
        }

        // close database connection 
        database.close();
        
        // Redirect request to token callback
        return res.redirect(content.callback);
      }
    }
  } catch (error) {
    console.log(error)
    return res.json(compose(status.ERROR.NOT_ALLOWED));
  }
};

module.exports = confirm;