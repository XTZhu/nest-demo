import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestServiceModule } from './nest-service.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NestServiceModule,
    {
      transport: Transport.TCP, // can change to other
      options: { port: 4000 },
    },
  );
  await app.listen(() => {
    Logger.log(`nest service is listening at 4000`);
  });
}
bootstrap();
