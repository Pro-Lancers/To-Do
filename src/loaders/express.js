const bodyParser = require("body-parser");
const cors = require("cors");
const methodOverride = require("method-override");
const { Response, Logger } = require("../package");
const { errors, isCelebrate } = require("celebrate");
const morgan = require("morgan");
const { prefix } = require("../config").api;

const router = require("../api");

exports.loadModules = ({ app }) => {

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  // HTTP request logger
  app.use(morgan("dev"));

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  app.use(methodOverride());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());
  
  // handle errors from 'celebrate'
  app.use(errors());

  // Load API routes
  router.loadRoutes(app, prefix);

  // / catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // / error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    /*
     * Handle Celebrate error so we can have our own response
     */
    if (isCelebrate(err)) {
      Response.fail(res, err.message, 422, undefined, err.details);
    }
    return next(err);
  });
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
};
