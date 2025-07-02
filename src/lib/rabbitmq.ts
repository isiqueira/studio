
import amqplib from 'amqplib';
import type { Connection, Channel } from 'amqplib';

const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
const queueName = 'logs';

let connection: Connection | null = null;
let channel: Channel | null = null;
let isConnecting = false;

async function connectToRabbitMQ() {
    if (channel || isConnecting) {
        return;
    }
    isConnecting = true;

    try {
        console.log('Attempting to connect to RabbitMQ for logging...');
        connection = await amqplib.connect(rabbitmqUrl);
        
        connection.on('error', (err) => {
            console.error('RabbitMQ connection error:', err.message);
            channel = null;
            connection = null;
        });

        connection.on('close', () => {
            console.log('RabbitMQ connection closed.');
            channel = null;
            connection = null;
        });

        channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });
        console.log('RabbitMQ logger connected and queue asserted.');
    } catch (err) {
        console.error('Failed to connect to RabbitMQ:', err instanceof Error ? err.message : String(err));
        channel = null;
        connection = null;
        throw err; // Re-throw the error so the caller can handle it.
    } finally {
        isConnecting = false;
    }
}

// Fire-and-forget sending function
export async function sendLogToRabbitMQ(log: any) {
    if (!channel) {
        await connectToRabbitMQ(); // This will throw if it fails, and the caller will catch it.
    }

    if (channel) {
        // If channel is closed, this will throw an error, which will be caught by the caller's .catch()
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(log)), {
            persistent: true,
        });
    } else {
        // This case is hit if connectToRabbitMQ failed.
        throw new Error('RabbitMQ channel not available. Log was not sent.');
    }
}
