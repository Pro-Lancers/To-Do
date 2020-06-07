const bcrypt = require("bcrypt");
const { isEmpty } = require("lodash");
const httpStatusCodes = require("http-status-codes");
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

const getUserInfo = async (criteria) =>
  models.user.findOne({
    attributes: ["id", "name", "email", "phone"],
    where: { ...criteria },
  });

// let fetchedInfo = {};
// if (!isEmpty(user)) {
//   user = user.get({ plain: true });
//   fetchedInfo = {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     phone: user.phone,
//   };
// }
// return Object.keys(fetchedInfo).length > 0 ? fetchedInfo : {};
// };

const isUserExistCheck = async (userId) => {
  const user = await models.user.findOne({
    where: { id: userId },
  });
  if (isEmpty(user))
    throw {
      name: "NotFoundError",
      message: "User not found",
      code: httpStatusCodes.NOT_FOUND,
    };
};
module.exports = { createUser, loginUser, getUserInfo, isUserExistCheck };
