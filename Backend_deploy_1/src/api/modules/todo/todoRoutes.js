const { Router } = require("express");
const Controller = require("./todoController");
const Validations = require("./todoValidations");

const router = Router({ mergeParams: true });

router.get(
  "/users/:userId/todos",
  Validations.getAllTodosOfUser,
  Controller.getAllTodosOfUser
);

router.post(
  "/users/:userId/todos",
  Validations.createTodoForUser,
  Controller.createTodoForUser
);

router.put(
  "/users/:userId/todos/:todoId",
  Validations.updateTodoForUser,
  Controller.updateTodoForUser
);

router.delete(
  "/users/:userId/todos/:todoId",
  Validations.deleteTodoForUser,
  Controller.deleteTodoForUser
);
module.exports = router;
