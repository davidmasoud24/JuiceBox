require("dotenv").config();
// remove this once you confirm it works
console.log(process.env.JWT_SECRET);

const { client } = require("./db");
client.connect();
const express = require("express");
const PORT = 3000;
const server = express();

server.use(express.json());

const morgan = require("morgan");
server.use(morgan("dev"));

const apiRouter = require("./api");
server.use("/api", apiRouter);

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
