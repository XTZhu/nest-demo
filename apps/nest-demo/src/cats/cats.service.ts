import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat): void {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: '*',
  })
  async pubSubHandler(msg: string): Promise<void> {
    console.log(`Received message: ${msg}`);
  }
}
