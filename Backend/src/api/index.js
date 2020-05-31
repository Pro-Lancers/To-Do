const userRoutes = require("../api/modules/user/userRoutes");
const todoRoutes = require("../api/modules/todo/todoRoutes");
const config = require("../config");
exports.loadRoutes = (app) => {
  app.use(`/${config.api.prefix}/`, userRoutes);
  app.use(`/${config.api.prefix}/`, todoRoutes);
};
