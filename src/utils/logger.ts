import { ENV } from '../config/vars';
import {
  createLogger,
  format,
  Logger,
  transports
  } from 'winston';

const logger: Logger = createLogger({
  level: "info",
  format: format.json(),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" })
  ]
});

/**
 * If we're not in production then log to the `console` with the format:
 * `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
 */
if (ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple()
    })
  );
}

export default logger;
