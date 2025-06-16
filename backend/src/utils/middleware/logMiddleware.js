// Middleware to log requests and responses
import logger from '../log.js'; // Import the winston logger

const log = (req, res, next) => {
  const start = new Date();

  next();

  const ms = new Date() - start;
  logger.info(
    `${req.method} ${req.originalUrl}. Status: ${res.statusCode}. Duration: ${ms} ms`,
  );
};

export default log;