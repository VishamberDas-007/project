const { check, body } = require("express-validator");

// validation of product insertion
exports.productInsertValidate = [
	// checking if the name field is empty and contains alphabets
	body("name")
		.not()
		.isEmpty()
		.withMessage({
			message: "Name not entered",
		})
		.isAlpha()
		.withMessage({
			message: "Input format not suppported",
		}),

	//validating the price field
	body("price")
		.not()
		.isEmpty()
		.withMessage({
			message: "Price not entered",
		})
		.isNumeric()
		.withMessage({
			message: "Input format not suppported",
		}),

	//validating the imageName
	check("imageName").not().isEmpty().withMessage({
		message: "Image name not entered",
	}),
];
