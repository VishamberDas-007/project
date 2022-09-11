"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class campaign_types extends Model {
		static associate(models) {}
	}
	campaign_types.init(
		{
			name: DataTypes.STRING(100),
			platform_name: DataTypes.STRING(15),
			description: DataTypes.STRING(255),
		},
		{
			sequelize,
			modelName: "campaign_types",
		}
	);
	return campaign_types;
};
