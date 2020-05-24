const userRoutes = require("../api/modules/user/userRoutes");
const config = require("../config");
exports.loadRoutes = (app) => {
  app.use(`/${config.api.prefix}/`, userRoutes);
};
