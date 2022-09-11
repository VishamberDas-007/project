const express = require("express"); // importing the express package
const routes = express.Router(); // initializing the router function
const { customer } = require("../../controllers/index"); // importing customer from cnotroller index
const { validationResult } = require("express-validator"); // importing the inbuild validation result from express validaor
const validation = require("../../validation/campaign"); // importing the validation for validating purpose

// post method for listing product
routes.post("/insert", validation.campaignInsertValidate, async (req, res) => {
	//validation result
	const errors = await validationResult(req);
	if (!errors.isEmpty()) {
		return res.json(errors);
	}

	//result from controller
	let result = await customer.campaign.insert(req);
	return res.status(result.status).json(result);
});

// get method for listing product to edit
routes.get("/edit/:id", validation.campaignIdValidate, async (req, res) => {
	//validation result
	const errors = await validationResult(req);
	if (!errors.isEmpty()) {
		return res.json(errors);
	}

	//result from controller
	let result = await customer.campaign.edit(req);
	return res.status(result.status).json(result);
});

// get method for listing all products
routes.get("/listing", async (req, res) => {
	let result = await customer.campaign.listing(req);
	return res.status(result.status).json(result);
});

// delete method for delete all products
routes.delete(
	"/delete/:id",
	validation.campaignIdValidate,
	async (req, res) => {
		//validation result
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res.json(errors);
		}

		// result from controller
		let result = await customer.campaign.delete(req);
		return res.status(result.status).json(result);
	}
);

// get method for listingg all campaign types
routes.get("/list", async (req, res) => {
	let result = await customer.campaign.list(req);
	return res.status(result.status).json(result);
});

// update the on_off status
routes.post("/on_off/:id", validation.campaignIdValidate, async (req, res) => {
	let result = await customer.campaign.on_off_status_change(req);
	return res.status(result.status).json(result);
});

module.exports = routes; //exporting routes
