"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class campaign_types extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			campaign_types.hasMany(models.campaign_details, {
				foreignKey: "campaign_type_id",
				sourceKey: "id",
			});
		}
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
