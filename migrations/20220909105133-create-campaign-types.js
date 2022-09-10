"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("campaign_types", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER(11),
			},
			name: {
				type: Sequelize.STRING(100),
				allowNull: false,
				unique: true,
			},
			platform_name: {
				type: Sequelize.STRING(15),
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("campaign_types");
	},
};
