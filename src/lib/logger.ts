import pino from 'pino';

const logger = pino(
  process.env.NODE_ENV === 'production'
    ? {} // Default production settings
    : {
        // The 'pino-pretty' transport is incompatible with the Next.js runtime,
        // so we use standard JSON logging in development to resolve the error.
        level: 'debug',
      }
);

export default logger;
