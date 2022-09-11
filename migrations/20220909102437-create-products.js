"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("products", {
			// below are the required fields to understand the products table
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER(11),
			},
			name: {
				type: Sequelize.STRING(50),
				allowNull: false,
				unique: true,
			},
			price: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
			},
			image_name: {
				type: Sequelize.STRING(50),
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
		await queryInterface.dropTable("products");
	},
};
