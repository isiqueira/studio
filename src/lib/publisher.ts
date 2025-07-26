// import client, { Connection, Channel, ConsumeMessage, ChannelModel } from "amqplib";
// const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
// const LOG_QUEUE = process.env.LOG_QUEUE || 'log_events';

// class RabbitMQConnection {
//   connection!: ChannelModel;
//   channel!: Channel;
//   private connected!: Boolean;

//   async connect() {
//     if (this.connected && this.channel) return;
    
//     try {
//       console.log(`⌛️ Connecting to Rabbit-MQ Server`);
      
//       // Create connection
//       this.connection = await client.connect(RABBITMQ_URL);

//       console.log(`✅ Rabbit MQ Connection is ready`);
//       console.log(`RabbitMQ URL: ${RABBITMQ_URL}`);
//       // Create channel from connection
//       this.channel = await this.connection.createChannel();
      
//       this.connected = true;
//     } catch (error) {
//       console.error('Connection failed:', error);
//       this.connected = false;
//     }
//   }

//   async sendToQueue(queue: string, message: any) {
//     try {
//       if (!this.channel) {
//         await this.connect();
//       }

//       this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }

//     async publishLog(logData: object) {
//         const message = Buffer.from(JSON.stringify(logData));
//         await this.sendToQueue(LOG_QUEUE, message);
//     }
// }


// const amqpClient = new RabbitMQConnection();

// export default amqpClient;
