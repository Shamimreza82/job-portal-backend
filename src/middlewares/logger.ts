import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, errors } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = createLogger({
  level: 'info', // default log level
  format: combine(
    colorize(),                  // colored console logs
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),     // include stack traces
    logFormat
  ),
  transports: [
    new transports.Console(),                       // log to console
    new transports.File({ filename: 'error.log', level: 'error' }), // only errors
    new transports.File({ filename: 'combined.log' })               // all logs
  ],
});
