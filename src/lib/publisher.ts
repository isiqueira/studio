
import amqp from 'amqplib';
import { URL } from 'url';

// A simple console logger for publisher-specific issues, to avoid circular dependency with the main logger.
const publisherLogger = {
    info: (msg: string) => console.log(`[Publisher] INFO: ${msg}`),
    warn: (msg: string) => console.warn(`[Publisher] WARN: ${msg}`),
    error: (err: any, msg: string) => console.error(`[Publisher] ERROR: ${msg}`, err),
}

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
const LOG_QUEUE = 'log_events';

let connection: amqp.Connection | null = null;
let channel: amqp.Channel | null = null;
let isConnecting = false;

function resetConnection() {
    channel = null;
    connection = null;
    isConnecting = false;
}

async function connect() {
    if (isConnecting) {
        publisherLogger.info('Connection attempt in progress, skipping new attempt.');
        return;
    }
    if (connection) return;

    isConnecting = true;

    try {
        // Add a check for the protocol, which is likely the cause of the error.
        const url = new URL(RABBITMQ_URL);
        if (url.protocol === 'amqp:' && url.hostname !== 'localhost' && url.hostname !== 'rabbitmq') {
            publisherLogger.warn(`Attempting to connect to remote host (${url.hostname}) using non-secure 'amqp://' protocol. CloudAMQP and other production services usually require a secure connection with 'amqps://'. Please check your RABBITMQ_URL environment variable.`);
        }

        publisherLogger.info(`Connecting to RabbitMQ...`);
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue(LOG_QUEUE, { durable: true });
        publisherLogger.info('RabbitMQ connected and queue asserted.');

        connection.on('error', (err) => {
            publisherLogger.error(err, 'RabbitMQ connection error');
            resetConnection();
        });
        connection.on('close', () => {
            publisherLogger.warn('RabbitMQ connection closed. It will auto-reconnect on the next log publish.');
            resetConnection();
        });
    } catch (err) {
        publisherLogger.error(err, 'Failed to connect to RabbitMQ.');
        resetConnection();
    } finally {
        isConnecting = false;
    }
}

export async function publishLog(logData: object) {
    if (!connection || !channel) {
        // Attempt to connect if not already connected.
        await connect();
    }

    if (channel) {
        try {
            const message = Buffer.from(JSON.stringify(logData));
            // This is non-blocking
            channel.sendToQueue(LOG_QUEUE, message, { persistent: true });
        } catch(err) {
            publisherLogger.error(err, 'Failed to send log to queue.');
            resetConnection();
        }
    }
    // If channel is still null here, it means connection failed, and it was already logged.
}

// Initial connection attempt on startup.
// We catch errors here so a failure on startup doesn't crash the whole app.
connect().catch(err => {
    publisherLogger.error(err, 'Initial RabbitMQ connection failed on startup. The app will continue to run.');
});
