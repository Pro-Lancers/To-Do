"use strict";
const { GENDERTYPES } = require("../utils/constants");
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("users", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM(GENDERTYPES),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => queryInterface.dropTable("users"),
};
