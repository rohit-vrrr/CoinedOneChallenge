const express = require("express");
const user = require("./user/controller.js");

const app = express();

app.use('/user', user);

module.exports = app;
