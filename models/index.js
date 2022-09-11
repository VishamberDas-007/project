"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.products = require("./products")(sequelize, Sequelize); // importing the product model
db.campaign_types = require("./campaign_types")(sequelize, Sequelize); // importing the campaign_types model
db.campaign_details = require("./campaign_details")(sequelize, Sequelize); // importing the campaign_details model

// campaign details relation with campaign types

db.campaign_details.belongsTo(db.campaign_types, {
	foreignKey: "campaign_type_id",
	targetKey: "id",
});

db.campaign_types.hasMany(db.campaign_details, {
	foreignKey: "campaign_type_id",
	sourceKey: "id",
});

// campaign details relation with products

db.products.hasMany(db.campaign_details, {
	foreignKey: "prod_id",
	sourceKey: "id",
});
db.campaign_details.belongsTo(db.products, {
	foreignKey: "prod_id",
	targetKey: "id",
});

module.exports = db; //exporting the db
