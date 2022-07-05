const { status, compose } = require("../../../utilities/composer.js");
const { MongoClient, ObjectId } = require("mongodb");
const url = process.env.MONGO_STRING;
const client = new MongoClient(url);

module.exports = async (req, res) => {
    if (!req.params.id) {
      return res.json(compose(status.DELETE.FAILED));
    }
    const id = req.params.id;
    try {
      // Connect to database
      await client.connect();
      const db = client.db("singlepage");
  
      const query = await db.collection("posts").deleteOne({_id: ObjectId(id)})
  
      if (!query.acknowledged){
      return res.json(compose(status.DELETE.FAILED));
      }
      
      // Return success status to user
      return res.json(compose(status.DELETE.SUCCESS));
    } catch (error) {
      console.log(error);
      return res.json(compose(status.DELETE.FAILED));
    }
  }