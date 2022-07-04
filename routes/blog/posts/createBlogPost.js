const { status, compose } = require("../../../utilities/composer.js");
const { MongoClient } = require("mongodb");
const url = process.env.MONGO_STRING;
const client = new MongoClient(url);


const POST = {
    title: null,
    content: null,
    published: false,
    creator: null,
    date: Math.round(Date.now()),
}

module.exports = async (req, res) => {
    
    // Create post object
    const post = {
        ...POST,
        ...req.body,
        creator: {
            _id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            role: req.user.role
        },
    }
    
    // Validate title and content
    if (!post.title || !post.content){
        return res.json(compose(status.CREATE.FAILED))
    }

    // validate length of title and content
    if (post.title.length >= 150 || post.content.length >= 20000){
        return res.json(compose(status.CREATE.FAILED))
    }

    try{
        // Connect to database
        await client.connect();
        const db = client.db("singlepage");

        // Insert query
        const query = await db.collection("posts").insertOne(post);

        // If insert query failed
        if (!query.insertedId){
            return res.json(compose(status.CREATE.FAILED));
        }

        // Return id of inserted post
        return res.json(compose(status.CREATE.SUCCESS, query.insertedId))
    } catch(error){
        console.log(error); 
        return res.json(compose(status.CREATE.FAILED));
    }
}