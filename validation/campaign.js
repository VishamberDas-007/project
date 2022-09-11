const { check, body, param } = require("express-validator"); // importing the required constraints for validating the requests

// validation of campaign insertion
exports.campaignInsertValidate = [
	// checking if the campaign_type_id field is empty and does not contains alphabets
	body("campaign_type_id")
		.not()
		.isEmpty()
		.withMessage({
			message: "campaign_type_id not entered",
		})
		.isNumeric()
		.withMessage({
			message: "Input format not suppported",
		}),

	// validating the product id
	body("prod_id")
		.not()
		.isEmpty()
		.withMessage({
			message: "campaign_type_id not entered",
		})
		.isNumeric()
		.withMessage({
			message: "Input format not suppported",
		}),

	// validating the start date id
	body("start_date")
		.not()
		.isEmpty()
		.withMessage({
			message: "start_date not entered",
		})
		.isDate()
		.withMessage({
			message: "Input format not suppported",
		}),

	// validating the end date
	body("end_date")
		.not()
		.isEmpty()
		.withMessage({
			message: "end_date not entered",
		})
		.isDate()
		.withMessage({
			message: "Input format not suppported",
		}),

	// validating the clicks
	body("clicks")
		.not()
		.isEmpty()
		.withMessage({
			message: "clicks not entered",
		})
		.isNumeric()
		.withMessage({
			message: "Input format not suppported",
		}),

	// validating the budget
	body("budget")
		.not()
		.isEmpty()
		.withMessage({
			message: "budget not entered",
		})
		.isNumeric()
		.withMessage({
			message: "Input format not suppported",
		}),

	// validating the status
	body("status")
		.notEmpty()
		.isIn(["Live now", "Paused", "Exhausted"])
		.withMessage("Invalid status type"),
];

// validation of campaign edit

// validation of campaign deletion

exports.campaignIdValidate = [
	//validating the id
	param("id")
		.notEmpty()
		.withMessage({
			message: "Id not entered",
		})
		.isNumeric()
		.withMessage({
			message: "Input format not supported",
		}),
];
