"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class products extends Model {
		static associate(models) {}
	}
	products.init(
		{
			name: DataTypes.STRING(50),
			price: DataTypes.INTEGER(11),
			image_name: DataTypes.STRING(50),
		},
		{
			sequelize,
			modelName: "products",
		}
	);
	return products;
};
