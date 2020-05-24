const { celebrate, Joi } = require("celebrate");
const { GENDERTYPES } = require("../../../utils/constants");

module.exports = {
  createUserSchema: celebrate({
    body: {
      firstName: Joi.string().min(2).required(),
      lastName: Joi.string().min(1),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).alphanum().required(),
      phone: Joi.string().length(10).required(),
      gender: Joi.string().valid(GENDERTYPES).required(),
    },
  }),

  loginSchema: celebrate({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(1).required(),
    },
  }),
};
