"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class campaign_details extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		// static associate(models) {
		// define association here
		// campaign_details.belongsTo(models.campaign_types, {
		// 	foreignKey: "campaign_type_id",
		// 	targetKey: "id",
		// });
		// campaign_details.belongsTo(models.products, {
		// 	foreignKey: "prod_id",
		// 	targetKey: "id",
		// });
		// }
	}
	campaign_details.init(
		{
			campaign_type_id: DataTypes.INTEGER(11),
			prod_id: DataTypes.INTEGER(11),
			start_date: DataTypes.DATEONLY,
			end_date: DataTypes.DATEONLY,
			clicks: DataTypes.INTEGER(11),
			budget: DataTypes.INTEGER(11),
			location: DataTypes.STRING(50),
			on_off: DataTypes.BOOLEAN,
			status: DataTypes.ENUM("Live now", "Paused", "Exhausted"),
		},
		{
			sequelize,
			modelName: "campaign_details",
		}
	);
	return campaign_details;
};
