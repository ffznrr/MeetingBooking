if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const app = express();
const pg = require("pg");
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = require("./router/index");
app.use(router);

const ErrorHandler = require("./middleware/errorHandler");
app.use(ErrorHandler);

module.exports = app;
