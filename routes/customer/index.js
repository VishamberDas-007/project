const express = require("express");
const routes = express.Router();

// routes.use("/campaigns", require("./campaign")); // importing the campaign routes

routes.use("/products", require("./products")); // importing the product routes

routes.use("/campaign", require("./campaign")); // importing the campaign routes

module.exports = routes; //exporting routes
