require("dotenv").config();

const config = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
  database: {
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    name: process.env.PG_DBNAME,
    host: process.env.PG_URL,
    dialect: "postgres",
  },

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "info",
  },

  /**
   * API configs
   */
  api: {
    prefix: `api/v1`,
  },

  jwtSecret: process.env.JWT_SECRET,
  saltRound: parseInt(process.env.SALT_ROUND),
};

module.exports = config;
