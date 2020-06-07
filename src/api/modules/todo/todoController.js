const { isEmpty } = require("lodash");
const { Response, Logger } = require("../../../package");
const httpStatusCodes = require("http-status-codes");
const TodoService = require("../../../services/Todo");
const TokenService = require("../../../services/Token");
const UserService = require("../../../services/User");
class TodoController {
  static async getAllTodosOfUser(req, res) {
    try {
      Logger.log("info", "fetching all todos for user");
      const userId = req.params.userId;
      await UserService.isUserExistCheck(userId);
      const userTodos = await TodoService.getAllTodosOfUser(userId);
      Response.success(res, "success", userTodos);
    } catch (error) {
      const code = error.code || httpStatusCodes.BAD_GATEWAY;
      Logger.log("error", "error in fetching all todos for a user", error);
      Response.fail(res, error.message, code);
    }
  }

  static async createTodoForUser(req, res) {
    try {
      const userId = req.params.userId;
      Logger.log("info", "Creating todo for the user");
      await UserService.isUserExistCheck(userId);
      const newTodo = await TodoService.createTodoForUser(userId, req.body);
      Response.success(res, "success", newTodo);
    } catch (error) {
      const code = error.code || httpStatusCodes.BAD_GATEWAY;
      Logger.log("error", "error in creating todo", error);
      Response.fail(res, error.message, code);
    }
  }

  static async updateTodoForUser(req, res) {
    try {
      Logger.log("error", "updating todo for user");
      const { userId, todoId } = req.params;

      if (isEmpty(req.body))
        return Response.fail(
          res,
          "require atleast one attribute to update",
          httpStatusCodes.UNPROCESSABLE_ENTITY
        );

      await UserService.isUserExistCheck(userId);

      const updatedTodo = await TodoService.updateTodoForUser(todoId, req.body);

      Response.success(res, "success", updatedTodo);
    } catch (error) {
      Logger.log("error", "error in updating todo for user", error);
      Response.fail(res, error.message, error.code);
    }
  }

  static async deleteTodoForUser(req, res) {
    try {
      Logger.log("info", "Deleting Todo for User");
      const { userId, todoId } = req.params;
      await UserService.isUserExistCheck(userId);
      await TodoService.deleteTodoForUser(todoId);
      Response.success(res, "success");
    } catch (error) {
      Logger.log("error", "deleting todo for user", error);
      Response.fail(res, error.message, error.code);
    }
  }
}

module.exports = TodoController;
