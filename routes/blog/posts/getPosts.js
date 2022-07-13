const { status, compose } = require("../../../utilities/composer.js");
const database = require("../../../utilities/database");

module.exports = async (req, res) => {

    try {
      // Connect to database
      await database.connect()

      const db = database.db("singlepage");

      // Read query
      const query = await db.collection("posts").find().toArray();

      // Check for response
      if (!query) {
        return res.json(compose(status.READ.FAILED));
      }

      database.close();
      // Return query results to end user
      return res.json(compose(status.READ.SUCCESS, query));
    } catch (error) {
      console.log(error);
      return res.json(compose(status.READ.FAILED));
    }
  }