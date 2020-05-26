const { Response, Logger } = require("../../../package");
const httpStatusCodes = require("http-status-codes");
const UserService = require("../../../services/User");
const TokenService = require("../../../services/Token");
class UserController {
  static async createUser(req, res) {
    try {
      Logger.log("info", "Creating user");
      const newUser = await UserService.createUser(req.body);
      console.log("newUser : ",newUser)
      Response.success(res, "success", newUser, httpStatusCodes.CREATED);
    } catch (error) {
      Logger.log("error", "error in creating user", error);
      Response.fail(res, error.message, httpStatusCodes.BAD_GATEWAY);
    }
  }
  static async loginUser(req, res) {
    try {
      Logger.log("info", "Logging in User");
      const isAuthuser = await UserService.loginUser(req.body);
      if (isAuthuser) {
        const userToken = TokenService.generateToken(req.body.email);
        Response.success(res, "success", { isAuth: true, token: userToken });
      } else {
        Response.fail(res, "unauthorised", httpStatusCodes.UNAUTHORIZED);
      }
    } catch (error) {
      Logger.log("error", "unable to login,please try again", error);
      Response.fail(res, "unable to login user", httpStatusCodes.BAD_GATEWAY);
    }
  }
}
module.exports = UserController;
