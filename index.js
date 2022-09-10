require("dotenv").config();
const express = require("express"); // importing the express package
const cors = require("cors");
const expressApp = express(); // initializing the express function
const bodyParser = require("body-parser"); // importing body-parser package

expressApp.use(bodyParser.json()); // parses the json format
expressApp.use(bodyParser.urlencoded({ extended: true })); // enhances to get the urlencoded requests
// const db = require("./models/index"); // importing the db from models

// below is for cross origin resource sharing
expressApp.use(
	cors({
		origin: "*",
	})
);

//routes
expressApp.use("/api", require("./routes/index"));

// Now the image can be accessible globally by using this
expressApp.use(express.static(__dirname + "/public"));
expressApp.use("/uploads", express.static("uploads"));

// Listening app at defined port in config file
expressApp.listen(process.env.PORT, () => {
	console.log("Running successfully on port number ", process.env.PORT);
});
