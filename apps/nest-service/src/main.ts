import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';
import { NestServiceModule } from './nest-service.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NestServiceModule,
    {
      name: 'Cat_Demo',
      transport: Transport.TCP,
      options: { port: 5961 },
    } as TcpOptions,
  );
  app.listen();
  Logger.log(`nest service is listening at 5961`);
}
bootstrap();
