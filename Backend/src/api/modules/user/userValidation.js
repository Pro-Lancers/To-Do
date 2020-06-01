const { celebrate, Joi } = require("celebrate");
const { GENDERTYPES } = require("../../../utils/constants");

module.exports = {
  createUserSchema: celebrate({
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      phone: Joi.string().length(10),
      gender: Joi.string().valid(GENDERTYPES).required(),
    },
  }),

  loginSchema: celebrate({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(1).required(),
    },
  }),
  
  getUserInfo: celebrate({
    params: {
      userId: Joi.string().uuid().required(),
    },
  }),
};
