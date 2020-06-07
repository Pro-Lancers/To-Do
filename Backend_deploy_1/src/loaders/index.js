const { Logger, Migrate } = require("../package");
const expressLoader = require("./express");
const { sequelize } = require("./sequelize");

const loader = async function ({ expressApp }) {
  await sequelize.authenticate();
  Logger.log("info", "✌️✌️✌️ DB loaded and connected! ✌️✌️✌️");

  await Migrate();
  Logger.log("info", "✌✌️✌️ Migration ran! ✌️✌️✌️");

  await expressLoader.loadModules({ app: expressApp });
  Logger.log("info", "✌️ Express loaded");
};

module.exports = loader;
