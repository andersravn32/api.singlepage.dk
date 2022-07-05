const { status, compose } = require("../../../utilities/composer.js");
const { MongoClient, ObjectId } = require("mongodb");
const url = process.env.MONGO_STRING;
const client = new MongoClient(url);

// Post template object
const POST = {
  title: null,
  content: null,
  published: false,
  slug: null,
  creator: null,
  date: Math.round(Date.now()),
};

module.exports = async (req, res) => {
  if (!req.params.id) {
    return res.json(compose(status.UPDATE.FAILED));
  }

  const id = req.params.id;

  // Create post object
  const post = {
    ...POST,
    ...req.body,
  };

  // Validate title and content
  if (!post.title || !post.content) {
    return res.json(compose(status.UPDATE.FAILED));
  }

  // validate length of title and content
  if (post.title.length >= 150 || post.content.length >= 20000) {
    return res.json(compose(status.UPDATE.FAILED));
  }

  // Formatting
  if (!post.slug) {
    post.slug = post.title.replace(/\s/g, "-");
  }

  try {
    // Connect to database
    await client.connect();
    const db = client.db("singlepage");

    // Update query
    const query = await db.collection("posts").updateOne(
      { _id: ObjectId(id) },
      {
        $set: post,
      }
    );

    if (!query.acknowledged) {
      return res.json(compose(status.UPDATE.FAILED));
    }

    // Return success status to user
    return res.json(compose(status.UPDATE.SUCCESS, query.insertedId));
  } catch (error) {
    console.log(error);
    return res.json(compose(status.UPDATE.FAILED));
  }
};
