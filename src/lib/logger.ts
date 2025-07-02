import pino from 'pino';
import type { LogFn } from 'pino';
import { sendLogToRabbitMQ } from './rabbitmq';

const pinoLogger = pino(
  process.env.NODE_ENV === 'production'
    ? {} // Default production settings
    : {
        level: 'debug',
      }
);

// This wrapper function handles Pino's overloaded call signatures
const logWrapper = (level: 'info' | 'warn' | 'error' | 'debug' | 'fatal' | 'trace'): LogFn => {
  return (obj: any, msg?: string, ...args: any[]) => {
    // Call original Pino logger to log to stdout
    pinoLogger[level](obj, msg, ...args);

    // Prepare the log object for RabbitMQ
    let logPayload: object;
    if (typeof obj === 'string') {
        // Handle logger.info("message", ...args)
        const message = msg ? `${obj} ${msg}` : obj;
        logPayload = { level, msg: message, details: args.length > 0 ? args : undefined };
    } else {
        // Handle logger.info({key: "value"}, "message")
        logPayload = { level, ...obj, msg };
    }

    // Asynchronously send the log to RabbitMQ
    sendLogToRabbitMQ(logPayload);
  };
};

const logger = {
  info: logWrapper('info'),
  warn: logWrapper('warn'),
  error: logWrapper('error'),
  debug: logWrapper('debug'),
  fatal: logWrapper('fatal'),
  trace: logWrapper('trace'),
};

export default logger;
