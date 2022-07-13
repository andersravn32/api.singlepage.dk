const {MongoClient} = require("mongodb");
const url = process.env.MONGO_STRING;

const client = new MongoClient(url);

module.exports = client;