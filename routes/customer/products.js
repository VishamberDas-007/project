const express = require("express"); // importing the express package
const routes = express.Router(); // initializing the router function
const { customer } = require("../../controllers/index"); // importing the customer ctrl
const { validationResult } = require("express-validator");
const validation = require("../../validation/product"); // importing the validation for validating purpose
const multer = require("multer");
const path = require("path");
const fileLocation = path.join(__dirname, "../../uploads");

var fileName, timeStamp, fileExtension, tempFileName;

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		fileExtension = path.extname(file.originalname);

		// validating the extension
		if (
			fileExtension == ".jpg" ||
			fileExtension == ".png" ||
			fileExtension == ".jpeg" ||
			fileExtension == ".gif"
		)
			cb(null, fileLocation);
		else cb("Upload Image only");
	},

	filename: function (req, file, cb) {
		timeStamp = Date.now();
		fileExtension = path.extname(file.originalname);
		fileName = timeStamp.toString() + fileExtension;
		cb(null, fileName);
	},
});
var upload = multer({ storage: storage });

// post method for inserting product
routes.post(
	"/insert",
	upload.single("file"),
	validation.productInsertValidate,
	async (req, res) => {
		//validation result
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res.json(errors);
		}

		// result from controller
		console.log(fileName);
		const result = await customer.product.insert(req, fileName);
		console.log({ result });
		return res.status(result.status).json({ result });
	}
);

// get method for listing product
routes.get("/listing", async (req, res) => {
	let result = await customer.product.listing(req);
	return res.status(result.status).json(result);
});

module.exports = routes;
