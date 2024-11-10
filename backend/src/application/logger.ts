import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  handleExceptions: true,
  handleRejections: true,
  transports: [new winston.transports.Console({})],
});
