// index file of controller

// admin ctrl
exports.customer = {
	product: require("./customer/products"), // importing product file
	campaign: require("./customer/campaign"), // importing campaign file
};
