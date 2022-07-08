const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

// configure .env files for JWT creation and MongoDb connection
const dotenv = require("dotenv");
dotenv.config();

// Enable cors support
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// Enable express body parser
app.use(
    express.urlencoded({
      extended: false,
    })
  );
app.use(express.json());

// Top level app router
app.use("/", require("./router"));

// Use fallback route
app.get("*", (req, res) => {
    res.json({
        time: Math.round(Date.now() / 1000),
        hostname: require("./package.json").name,
        version: require("./package.json").version,
        description: require("./package.json").description,
    })
});

const port = process.env.PORT || 3000;

// Enable server
server.listen(port, () => {
  console.log(`Time: ${Math.round(Date.now() / 1000)}`)
  console.log(`Package: ${require("./package.json").name}`)
  console.log(`Version: ${require("./package.json").version}`)
  console.log(`Description: ${require("./package.json").description}`)
  console.log(`Running server on port ${port}`);
});