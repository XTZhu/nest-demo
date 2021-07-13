import { Injectable } from '@nestjs/common';

@Injectable()
export class NestServiceService {
  getHello(name: string): string {
    console.log(`Hello ${name}`);
    return `Hello ${name}`;
  }

  // @RabbitSubscribe({
  //   exchange: 'exchange1',
  //   routingKey: 'soha.pub',
  // })
  // public async pubSubHandler(msg: string): Promise<void> {
  //   try {
  //     console.log(`Received msg: ${JSON.stringify(msg)}`);
  //     Logger.log(`Received msg: ${JSON.stringify(msg)}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
