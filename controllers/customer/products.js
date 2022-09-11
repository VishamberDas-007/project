const path = require("path"); // importing the path
const responses = require("../../responses/response"); // importing the responses
const productModel = require("../../models/index").products; // importing the product model

// creating the insert function for inserting the product details
exports.insert = async (req, fileName) => {
	try {
		// requesting and initializing the values of the fields in product table
		const productDetails = {
			name: req.body.name,
			price: req.body.price,
			imageName: fileName,
		};

		// check if the product name already exists
		const productExists = await productModel.findOne({
			where: {
				name: productDetails.name,
			},
		});
		if (productExists) {
			return responses.alreadyExists("Product already present");
		}

		// adding to the product model
		const addProduct = await productModel.create({
			name: productDetails.name,
			price: productDetails.price,
			image_name: productDetails.imageName,
		});

		// returning the successs response
		return responses.successResponse(
			"Product inserted successfully",
			addProduct
		);
	} catch (error) {
		// if any error then it will be caught in this block
		return responses.errorResponse(
			"Error occurred while inserting the product",
			error
		);
	}
};

// creating the listing function for lising the product details
exports.listing = async (req, res) => {
	try {
		const fileLocation = "http://localhost:7777/uploads/";
		// requesting the product details from the model

		const productExists = await productModel.findAll({});

		if (!productExists) {
			return responses.notFound("No product found!!");
		}

		// to assign the prefix to the image name to be accessed globally
		productExists.forEach((element) => {
			if (element.dataValues.image_name) {
				var temp = element.dataValues.image_name;
				element.dataValues.image_name = fileLocation + temp;
			}
		});

		// returning the successs response
		return responses.successResponse(
			"Product found successfully",
			productExists
		);
	} catch (error) {
		// if any error then it will be caught in this block
		return responses.errorResponse(
			"Error occurred while listing the product",
			error
		);
	}
};
