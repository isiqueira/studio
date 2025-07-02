import pino from 'pino';

const logger = pino(
  process.env.NODE_ENV === 'production'
    ? {} // Default production settings
    : {
        level: 'debug',
      }
);

export default logger;
