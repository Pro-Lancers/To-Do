const { Router } = require("express");
const Controller = require("./userController");
const Validations = require("./userValidation");

const router = Router({ mergeParams: true });

router.post(
  "/users",
  Validations.createUserSchema,
  Controller.createUser
);

router.get(
  "/users/:userId",
  Validations.getUserInfo,
  Controller.getUserInfo
);

router.post(
  "/users/login",
  Validations.loginSchema,
  Controller.loginUser
);

module.exports = router;
