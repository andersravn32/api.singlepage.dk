const { status, compose } = require("../../../utilities/composer.js");
const { ObjectId } = require("mongodb");
const database = require("../../../utilities/database");

module.exports = async (req, res) => {
    // Insure that ID is present
    if (!req.params.id) {
      return res.json(compose(status.READ.FAILED));
    }
    const id = req.params.id;

    try {
      // Connect to database
      await database.connect();
      const db = database.db("singlepage");
      
      // Read query
      const query = await db.collection("posts").findOne({ _id: ObjectId(id) });
  
      // If no data is found, return read failed
      if (!query.length) {
        return res.json(compose(status.READ.FAILED));
      }
      
      database.close();

      // Return query to user
      return res.json(compose(status.READ.SUCCESS, query));
    } catch (error) {
      console.log(error);
      return res.json(compose(status.READ.FAILED));
    }
  }