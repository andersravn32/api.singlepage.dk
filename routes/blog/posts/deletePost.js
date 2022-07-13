const { status, compose } = require("../../../utilities/composer.js");
const { ObjectId } = require("mongodb");
const database = require("../../../utilities/database");

module.exports = async (req, res) => {
    if (!req.params.id) {
      return res.json(compose(status.DELETE.FAILED));
    }
    const id = req.params.id;
    try {
      // Connect to database
      await database.connect();
      const db = database.db("singlepage");
  
      const query = await db.collection("posts").deleteOne({_id: ObjectId(id)})
  
      if (!query.acknowledged){
      return res.json(compose(status.DELETE.FAILED));
      }
      
      database.close();

      // Return success status to user
      return res.json(compose(status.DELETE.SUCCESS));
    } catch (error) {
      console.log(error);
      return res.json(compose(status.DELETE.FAILED));
    }
  }