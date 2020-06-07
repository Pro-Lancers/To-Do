// todo: can make the datatypes of priority and label as ENUM by finalizing the value
const { IN_PROGRESS_STAGE  } = require("../utils/constants");

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "todo",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: true,
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
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  Todo.associate = (model) => {
    Todo.belongsTo(model.user, { onDelete: "cascade", onUpdate: "cascade" });
  };

  return Todo;
};
