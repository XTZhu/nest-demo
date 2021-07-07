import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestServiceModule } from './nest-service.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NestServiceModule,
    {
      transport: Transport.RMQ, // can change to other
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: 'cats_queue',
        queueOptions: { durable: true },
      },
    },
  );
  app.listen(() => {
    Logger.log(`nest service is listening at 3000`);
  });
}
bootstrap();
