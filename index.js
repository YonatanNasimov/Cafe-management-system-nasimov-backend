const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();

const { routesInit } = require("./routes/configRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

routesInit(app);

const server = http.createServer(app);

server.listen(process.env.PORT || 3002, () => {
    console.log("server is running...")
});

