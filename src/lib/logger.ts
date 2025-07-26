import pino from 'pino';

const pinoConfig =
{
    level: 'debug',
};

const logger = pino(pinoConfig);

export default logger;
