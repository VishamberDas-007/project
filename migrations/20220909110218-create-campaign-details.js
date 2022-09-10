"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("campaign_details", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER(11),
			},
			campaign_type_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				references: {
					model: "campaign_types",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			prod_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				references: {
					model: "products",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			start_date: {
				type: Sequelize.DATEONLY,
				allowNull: false,
			},
			end_date: {
				type: Sequelize.DATEONLY,
				allowNull: false,
			},
			clicks: {
				type: Sequelize.INTEGER(11),
			},
			budget: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
			},
			location: {
				type: Sequelize.STRING(50),
			},
			on_off: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
				allowNull: false,
			},
			status: {
				type: Sequelize.ENUM("Live now", "Paused", "Exhausted"),
				defaultValue: "Live now",
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
		await queryInterface.dropTable("campaign_details");
	},
};
