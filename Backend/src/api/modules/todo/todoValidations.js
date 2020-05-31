const { celebrate, Joi } = require("celebrate");
const {
  TODO_STAGES,
  PRIORITY_TYPES,
  LABEL_TYPES,
} = require("../../../utils/constants");

module.exports = {
  getAllTodosOfUser: celebrate({
    params: {
      userId: Joi.string().uuid().required(),
    },
  }),
  createTodoForUser: celebrate({
    params: {
      userId: Joi.string().uuid().required(),
    },
    body: {
      todoItem: Joi.string().required(),
      stage: Joi.string().valid(TODO_STAGES).required(),
      priority: Joi.string().valid(PRIORITY_TYPES).required(),
      label: Joi.string().valid(LABEL_TYPES).required(),
      dueDate: Joi.date().required(),
    },
  }),
  updateTodoForUser: celebrate({
    params: {
      userId: Joi.string().uuid().required(),
      todoId: Joi.string().uuid().required(),
    },
    body: {
      todoItem: Joi.string(),
      stage: Joi.string().valid(TODO_STAGES),
      priority: Joi.string().valid(PRIORITY_TYPES),
      label: Joi.string().valid(LABEL_TYPES),
      dueDate: Joi.date(),
    },
  }),
  deleteTodoForUser: celebrate({
    params: {
      userId: Joi.string().uuid().required(),
      todoId: Joi.string().uuid().required(),
    },
  }),
};
