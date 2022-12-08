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

// Use fallback route
app.get("*", (req, res) => {
  res.json({
    artists: [
      {
        name: "Ude af Kontrol",
        identifier: "ude-af-kontrol",
        some: {
          instagram: "",
          facebook: "",
          website: "",
        },
        image: "https://i.ibb.co/TLNC7bZ/ude-af-kontrol-cut.png",
        header:
          "https://www.information.dk/sites/information.dk/files/styles/930x/public/media/2018/03/23/we_uak1035.jpg?itok=1DEX5cpG",
        body: "<hello>",
      },
      {
        name: "FABRÄK",
        identifier: "fabrak",
        some: {
          instagram: "",
          facebook: "",
          website: "",
        },
        image:
          "https://static.wixstatic.com/media/666a92_fde60b94ef264f558ea60f6a341ea133~mv2.jpg",
        header:
          "https://static.wixstatic.com/media/666a92_fde60b94ef264f558ea60f6a341ea133~mv2.jpg",
        body: "<hello>",
      },
    ],
    program: {
      users: {},
    },
  });
});

const port = process.env.PORT || 3000;

// Enable server
server.listen(port, () => {
  console.log(`Time: ${Math.round(Date.now() / 1000)}`);
  console.log(`Package: ${require("./package.json").name}`);
  console.log(`Version: ${require("./package.json").version}`);
  console.log(`Description: ${require("./package.json").description}`);
  console.log(`Running server on port ${port}`);
});
