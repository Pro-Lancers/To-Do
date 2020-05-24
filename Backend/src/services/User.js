const bcrypt = require("bcrypt");
const { isEmpty } = require("lodash");
const { sequelize, models } = require("../loaders/sequelize");
const config = require("../config");
const { uuid } = require("uuidv4");

const saltRounds = config.saltRound;
const salt = bcrypt.genSaltSync(saltRounds);

const createUser = async (userData) => {
  userData.password = bcrypt.hashSync(userData.password, salt);
  userData.id = uuid();
  const user = await models.user.create(userData);
  user.password = undefined;
  return user;
};

const loginUser = async (userData) => {
  let user = await models.user.findOne({
    where: { email: userData.email },
  });
  if (!isEmpty(user)) {
    user = user.get({ plain: true });
    return bcrypt.compareSync(userData.password, user.password);
  }
  return false;
};
module.exports = { createUser, loginUser };
