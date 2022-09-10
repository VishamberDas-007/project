const express = require("express");
const routes = express.Router();

routes.use("/customer", require("./customer/index")); // importing the admin routes

module.exports = routes;
