const { Router } = require("express");
const Controller = require("./todoController");
const Validations = require("./todoValidations");
const Middlewares = require("../../middlewares");
const router = Router({ mergeParams: true });

router.get(
  "/users/:userId/todos",
  Middlewares.authenticateUser,
  Validations.getAllTodosOfUser,
  Controller.getAllTodosOfUser
);

router.post(
  "/users/:userId/todos",
  Middlewares.authenticateUser,
  Validations.createTodoForUser,
  Controller.createTodoForUser
);

router.put(
  "/users/:userId/todos/:todoId",
  Middlewares.authenticateUser,
  Validations.updateTodoForUser,
  Controller.updateTodoForUser
);

router.delete(
  "/users/:userId/todos/:todoId",
  Middlewares.authenticateUser,
  Validations.deleteTodoForUser,
  Controller.deleteTodoForUser
);
module.exports = router;
