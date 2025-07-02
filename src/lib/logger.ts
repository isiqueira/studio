import pino from 'pino';
import { Writable } from 'stream';
import { publishLog } from './publisher';

// Custom stream to publish logs
const publisherStream = new Writable({
    write(chunk, encoding, callback) {
        try {
            const logEntry = JSON.parse(chunk.toString());
            // Fire and forget, error handling is inside publishLog
            publishLog(logEntry);
        } catch (err) {
            console.error('[Logger] Failed to process log for publishing:', err);
        }
        callback();
    },
});

const logger = pino(
    {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
    // pino.multistream takes an array of destination streams
    pino.multistream([
        { stream: process.stdout }, // Default console output
        { stream: publisherStream }, // Our custom publisher
    ])
);

export default logger;
