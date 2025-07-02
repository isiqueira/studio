import pino from 'pino';

const logger = pino(
  process.env.NODE_ENV === 'production'
    ? {} // Default production settings
    : {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      }
);

export default logger;
