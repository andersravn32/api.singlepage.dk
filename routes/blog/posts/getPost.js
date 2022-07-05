const { status, compose } = require("../../../utilities/composer.js");
const { MongoClient, ObjectId } = require("mongodb");
const url = process.env.MONGO_STRING;
const client = new MongoClient(url);

module.exports = async (req, res) => {
    try {
      // Connect to database
      await client.connect();
      const db = client.db("singlepage");
  
      // Read query
      const query = await db.collection("posts").find().toArray();
  
      // If no data is found, return read failed
      if (!query.length) {
        return res.json(compose(status.READ.FAILED));
      }
  
      // Return query to user
      return res.json(compose(status.READ.SUCCESS, query));
    } catch (error) {
      console.log(error);
      return res.json(compose(status.READ.FAILED));
    }
  }