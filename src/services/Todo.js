const bcrypt = require("bcrypt");
const { uuid } = require("uuidv4");
const httpStatusCodes = require("http-status-codes");
const { isEmpty } = require("lodash");
const { sequelize, models } = require("../loaders/sequelize");
const config = require("../config");

const getAllTodosOfUser = (userId) =>
  models.todo.findAll({
    where: {
      userId,
    },
  });

const createTodoForUser = async (userId, todoData) => {
  todoData.id = uuid();
  todoData.userId = userId;
  const todoItem = await models.todo.create(todoData);
  return todoItem;
};

const updateTodoForUser = async (todoId, todoData) => {
  await models.todo.update(todoData, { where: { id: todoId } });
  return models.todo.findOne({ where: { id: todoId } });
};

const deleteTodoForUser = (todoId) =>
  models.todo.destroy({ where: { id: todoId } });

module.exports = {
  getAllTodosOfUser,
  createTodoForUser,
  updateTodoForUser,
  deleteTodoForUser,
};
