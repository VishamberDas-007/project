const express = require("express"); //importing the express package
const routes = express.Router(); // using the Router function in expresss

routes.use("/products", require("./products")); // importing the product routes

routes.use("/campaign", require("./campaign")); // importing the campaign routes

module.exports = routes; //exporting routes
