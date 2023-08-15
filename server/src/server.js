const express = require("express");
const mainRoutes = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(mainRoutes);

module.exports = server;
