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
const campaignDetailsModel = require("../../models/campaign_details");
console.log(campaignDetailsModel);
const moment = require("moment"); // importing for formating date
const { Op } = require("sequelize");
// const e = require("express");

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

// edit/listing function is used to edit campaign details
exports.edit = async (req) => {
	try {
		const id = req.params.id;

		// checking if the campaign exists

		const campaignExists = await db.campaign_details.findOne({
			where: {
				id: id,
				on_off: true,
			},
			include: [
				{
					model: db.campaign_types,
				},
				{
					model: db.products,
				},
			],
		});

		if (!campaignExists) {
			return responses.notFound("No such campaign found");
		} else {
			return responses.successResponse("Campaign found successfully!!", {
				id: campaignExists.dataValues.id,
				campaign_type_id: campaignExists.dataValues.campaign_type_id,
				prod_id: campaignExists.dataValues.prod_id,
				start_date: campaignExists.dataValues.start_date,
				end_date: campaignExists.dataValues.end_date,
				clicks: campaignExists.dataValues.clicks,
				budget: campaignExists.dataValues.budget,
				location: campaignExists.dataValues.location,
				on_off: campaignExists.dataValues.on_off,
				status: campaignExists.dataValues.status,
				campaign_type_name: campaignExists.dataValues.campaign_type.name,
				campaign_platform_name:
					campaignExists.dataValues.campaign_type.platform_name,
				product_name: campaignExists.dataValues.product.name,
				image_name: campaignExists.dataValues.product.image_name,
			});
		}
	} catch (error) {
		return responses.errorResponse(
			"Error occurred while listing campaign",
			error
		);
	}
};

//listing function used for listing the campaign details
exports.listing = async (req) => {
	try {
		var arr = [];
		const fileLocation = "http://localhost:7777/uploads/";
		// checking if the campaign exists
		const campaignExists = await db.campaign_details.findAll({
			include: [
				{
					model: db.campaign_types,
					attributes: ["name", "platform_name"],
				},
				{
					model: db.products,
					attributes: ["name", "image_name"],
				},
			],
			// nest: true,
		});
		// .then((data) => {
		// 	console.log(data.get({ plain: true }));
		// });

		if (campaignExists.length == 0) {
			return responses.notFound("No campaigns found");
		} else {
			campaignExists.forEach((element) => {
				arr.push({
					id: element.dataValues.id,
					campaign_type_id: element.dataValues.campaign_type_id,
					prod_id: element.dataValues.prod_id,
					start_date: element.dataValues.start_date,
					end_date: element.dataValues.end_date,
					clicks: element.dataValues.clicks,
					budget: element.dataValues.budget,
					location: element.dataValues.location,
					on_off: element.dataValues.on_off,
					status: element.dataValues.status,
					campaign_type_name: element.dataValues.campaign_type.name,
					campaign_platform_name:
						element.dataValues.campaign_type.platform_name,
					product_name: element.dataValues.product.name,
					image_name: fileLocation + element.dataValues.product.image_name,
				});
				console.log(arr);
			});

			return responses.successResponse("Campaigns found successfully!!", arr);
		}
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
		const id = req.params.id;

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
