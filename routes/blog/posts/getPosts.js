const { status, compose } = require("../../../utilities/composer.js");
const { MongoClient, ObjectId } = require("mongodb");
const url = process.env.MONGO_STRING;
const client = new MongoClient(url);

module.exports = async (req, res) => {
    // Insure that ID is present
    if (!req.params.id) {
      return res.json(compose(status.READ.FAILED));
    }
  
    const id = req.params.id;
  
    try {
      // Connect to database
      await client.connect();
      const db = client.db("singlepage");
  
      // Read query
      const query = await db.collection("posts").findOne({ _id: ObjectId(id) });
  
      // Check for response
      if (!query) {
        return res.json(compose(status.READ.FAILED));
      }
  
      // Return query results to end user
      return res.json(compose(status.READ.SUCCESS, query));
    } catch (error) {
      console.log(error);
      return res.json(compose(status.READ.FAILED));
    }
  }