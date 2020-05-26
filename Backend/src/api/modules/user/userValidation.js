const { celebrate, Joi } = require("celebrate");
const { GENDERTYPES } = require("../../../utils/constants");

module.exports = {
  createUserSchema: celebrate({
    body: {
      name: Joi.string().min(4).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).alphanum().required(),
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
};
