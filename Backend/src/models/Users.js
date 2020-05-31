const { GENDERTYPES } = require("../utils/constants");
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "user",
    {
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
    },
    {
      timestamps: true,
    }
  );
  User.associate = (model) => {
    User.hasMany(model.todo);
  };
  return User;
};
