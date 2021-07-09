import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NestServiceService {
  getHello(name: string): string {
    console.log(`Hello ${name}`);
    return `Hello ${name}`;
  }

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'soha.pub',
  })
  public async pubSubHandler(msg: string): Promise<void> {
    console.log(`Received msg: ${msg}`);
    Logger.log(`Received msg: ${msg}`);
  }
}
