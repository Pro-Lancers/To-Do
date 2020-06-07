const { Logger, Response } = require("../../package");
const TokenService = require("../../services/Token");
const httpStatusCodes = require("http-status-codes");

const authenticateUser = (req, res, next) => {
  try {
    Logger.log("info", "authenticating user");
    if (!req.headers.token)
      return Response.fail(
        res,
        "token is required",
        httpStatusCodes.UNPROCESSABLE_ENTITY
      );
    TokenService.verifyToken(req.headers.token);
    next();
  } catch (err) {
    Logger.log("error", "error in authenticating user", err);
    Response.fail(res, "unauthorised", httpStatusCodes.UNAUTHORIZED);
  }
};

module.exports = authenticateUser;
