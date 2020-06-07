const _ = require('lodash');
const winston = require('winston');

let LoggerInstance = null;

module.exports = {
  init: ({ transports = [], level = 'info', defaultMeta = {} } = {}) => {
    if (!_.isArray(transports)) {
      throw new Error('transports is not an array');
    }

    if (!Object.keys(winston.config.npm.levels).includes(level)) {
      throw new Error('invalid level');
    }

    if (!_.isObject(defaultMeta) || _.isArray(defaultMeta)) {
      throw new Error('invalid default meta');
    }

    if (_.isEmpty(transports)) {
      if (process.env.NODE_ENV === 'development') {
        transports.push(
          new winston.transports.Console({
            format: winston.format.combine(winston.format.cli(), winston.format.splat()),
          }),
        );
      } else {
        transports.push(new winston.transports.Console());
      }
    }

    LoggerInstance = winston.createLogger({
      level: level || 'info',
      levels: winston.config.npm.levels,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      transports,
      defaultMeta,
    });
  },

  log: (level, message, meta = {}) => {
    LoggerInstance.log(level, message, meta);
  },
};
