"use strict";
const {GENDERTYPES} = require("../utils/constants");
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("users", {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            gender: {
                type: Sequelize.ENUM(GENDERTYPES),
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface) => queryInterface.dropTable("users"),
};
