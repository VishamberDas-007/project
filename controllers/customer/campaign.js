// Reach broad audience and get leads through calls
// Get more FB messages from Leads
// Encourage customers to follow your page
// Encourage customers to take action
// Increase organic views by obtaining user attention
// Get the right people to visit your website
// Drive visits to local stores, restaurants & Dealerships
// Get more installs, interactions for your app
// Drive the sales of your catalogue and get more leads

const responses = require("../../responses/response"); // importing the responses

const db = require("../../models/index"); // importing the db to access all models
const moment = require("moment"); // importing for formating date
const { Op } = require("sequelize");

// insert/update function is used to insert campaign details
exports.insert = async (req) => {
	try {
		// requesting the data and assigning it into the object
		const id = req.query.id;
		const campaign_details = {
			campaign_type_id: req.body.campaign_type_id,
			prod_id: req.body.prod_id,
			start_date: req.body.start_date,
			end_date: req.body.end_date,
			clicks: req.body.clicks,
			budget: req.body.budget,
			location: req.body.location,
			// on_off: req.body.on_off,
			status: req.body.status,
		};
		var addCampaignDetails, campaignAndProductExists;

		// check if the product exists
		const productExists = await db.products.findOne({
			where: {
				id: campaign_details.prod_id,
			},
		});

		//check if the campaign_type exists
		const campaignExists = await db.campaign_types.findOne({
			where: {
				id: campaign_details.campaign_type_id,
			},
		});

		//check if the campaign details exists
		if (id) {
			const campaign_detailsExists = await db.campaign_details.findOne({
				where: { id: id },
			});
			if (!campaign_detailsExists) {
				return responses.notFound("No such campaign_detail found");
			}
		}

		if (!campaignExists || !productExists) {
			return responses.notFound(
				"No such campaign or product or campaign_detail found"
			);
		}

		// checking if the date format is proper
		if (
			moment(campaign_details.start_date).isAfter(campaign_details.end_date)
		) {
			return responses.errorResponse(
				"No such format allowed",
				" end-date:" +
					campaign_details.end_date +
					" is before start-date:" +
					campaign_details.start_date
			);
		}

		// checking if same campaign and product repeating
		if (id) {
			campaignAndProductExists = await db.campaign_details.findOne({
				where: {
					id: {
						[Op.ne]: id,
					},
					campaign_type_id: campaign_details.campaign_type_id,
					prod_id: campaign_details.prod_id,
				},
			});
		} else {
			campaignAndProductExists = await db.campaign_details.findOne({
				where: {
					campaign_type_id: campaign_details.campaign_type_id,
					prod_id: campaign_details.prod_id,
				},
			});
		}
		console.log(campaignAndProductExists);
		if (campaignAndProductExists) {
			return responses.alreadyExists("Campaign and product already exists");
		}

		if (id) {
			addCampaignDetails = await db.campaign_details.update(campaign_details, {
				where: {
					id: id,
				},
			});
		}

		//adding the campaign
		else {
			addCampaignDetails = await db.campaign_details.create(campaign_details);
		}
		return responses.successResponse(
			"Campaign added successfully ",
			addCampaignDetails
		);
		// returning the response
	} catch (error) {
		return responses.errorResponse(
			"Error occurred while inserting in campaign details",
			error
		);
	}
};

// edit function is used to edit campaign details
exports.edit = async (req) => {
	try {
		const id = req.query.id;

		// checking if the campaign exists
		const campaignExists = await db.campaign_details.findOne({
			// where: {
			// 	id: id,
			// 	// on_off: true,
			// },
			include: [
				{
					model: db.campaign_types,
					// as: "campaign_types",
					where: {
						id: db.campaign_details.campaign_type_id,
					},
				},
			],
		});

		// const campaignExists = await db.campaign_types.findAll({
		// 	include: {
		// 		model: db.campaign_details,
		// 	},
		// });

		if (!campaignExists) {
			return responses.notFound("No such campaign found");
		}

		const productDetails = await db.products.findOne({
			where: {
				id: id,
			},
		});

		const compaignDetails = {
			// id: ,
			// campaign_type_id: 1,
			// prod_id: 2,
			name: productDetails.dataValues.name,
			start_date: campaignExists.dataValues.start_date,
			end_date: campaignExists.dataValues.end_date,
			clicks: campaignExists.dataValues.clicks,
			budget: campaignExists.dataValues.budget,
			location: campaignExists.dataValues.location,
			on_off: campaignExists.dataValues.on_off,
			status: campaignExists.dataValues.status,
		};
		// console.log(productDetails);
		// campaignExists.product_name = productDetails.dataValues.name;
		// campaignExists.image_name = productDetails.dataValues.image_name;
		return responses.successResponse(
			"Campaign found successfully!!",
			compaignDetails
		);
	} catch (error) {
		return responses.errorResponse(
			"Error occurred while editing campaign",
			error
		);
	}
};

//listing function used for listing the campaign details
exports.listing = async (req) => {
	try {
		// checking if the campaign exists
		const campaignExists = await db.campaign_details.findAll();

		if (!campaignExists) {
			return responses.notFound("No campaigns found");
		}

		return responses.successResponse(
			"Campaigns found successfully!!",
			campaignExists
		);
	} catch (error) {
		return responses.errorResponse(
			"Error occurred while editing campaign",
			error
		);
	}
};

// delete function used for deleting details
exports.delete = async (req, res) => {
	try {
		// requesting and initializing the campaign id to be deleted
		const id = req.query.id;

		// requesting the campaign details from the model
		// check if campaign exists
		const campaignExists = await db.campaign_details.findOne({
			where: {
				id: id,
				on_off: true,
			},
		});
		if (!campaignExists) {
			return responses.notFound("No such campaign found!!");
		}

		await campaignExists.destroy();

		// returning the successs response
		return responses.successResponse(
			"campaign deleted successfully",
			campaignExists
		);
	} catch (error) {
		// if any error then it will be caught in this block
		return responses.errorResponse(
			"Error occurred while deleting the campaign",
			error
		);
	}
};
