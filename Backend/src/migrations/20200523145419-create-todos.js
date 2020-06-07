const { IN_PROGRESS_STAGE } = require("../utils/constants");

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("todos", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      todoItem: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      stage: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: IN_PROGRESS_STAGE,
      },
      priority: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dueDate: {
        type: DataTypes.DATE,
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
      deletedAt: {
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("todos");
  },
};
