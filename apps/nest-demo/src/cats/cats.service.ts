import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  // constructor(private readonly amqp: AmqpConnection) {
  //   this.amqp.channel.prefetch(1, true);
  // }
  private readonly cats: Cat[] = [];

  create(cat: Cat): void {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  // @RabbitSubscribe({
  //   exchange: 'exchange1',
  //   routingKey: '*',
  // })
  // async pubSubHandler(msg: string): Promise<void> {
  //   console.log(`Received message: ${msg}`);
  // }

  // async test() {
  //   const a = await this.amqp.channel.assertQueue('sg:unformat', {
  //     durable: false,
  //   });
  //   console.log(a);
  //   let num = 0;
  //   while (num < 1000) {
  //     this.sendMsg('sg:unformat', num);
  //     num++;
  //   }
  //   // setInterval(() => this.sendMsg('sg:unformat', num), 100);
  //   // setInterval(() => this.sendMsg('sg:unformat', num), 100);
  //   // await this.amqp.publish('some-exchange', 'sg', {
  //   //   msg: 'hello world',
  //   // })
  // }

  // sendMsg(queue: string, num: number, isFormat?: boolean) {
  //   this.amqp.channel.sendToQueue(
  //     queue,
  //     Buffer.from(`hello world ${num} ${isFormat ? 'format' : Date.now()}`),
  //   );
  // }

  // async formatMsg() {
  //   await this.amqp.channel.assertQueue('sg:unformat', {
  //     durable: false,
  //   });
  //   this.amqp.channel.consume('sg:unformat', async msg => {
  //     console.log(msg.content.toString(), 'sg:unformat1');
  //     await this.sleep(1000);
  //     this.sendMsg('sg:format', 1, true);

  //     this.amqp.channel.ack(msg);
  //   });
  //   this.amqp.channel.consume('sg:unformat', async msg => {
  //     console.log(msg.content.toString(), 'sg:unformat2');
  //     await this.sleep(1000);
  //     this.sendMsg('sg:format', 0, true);

  //     this.amqp.channel.ack(msg);
  //   });
  //   this.amqp.channel.consume('sg:unformat', async msg => {
  //     console.log(msg.content.toString(), 'sg:unformat3');
  //     await this.sleep(1000);
  //     this.sendMsg('sg:format', 2, true);

  //     this.amqp.channel.ack(msg);
  //   });
  // }

  // async getMsg() {
  //   await this.amqp.channel.assertQueue('sg:format', {
  //     durable: false,
  //   });

  //   await this.amqp.channel.consume(
  //     'sg:format',
  //     async msg => {
  //       console.log(msg.content.toString(), 'sg:format');
  //       // a += `${msg.content.toString()}_`;
  //       await this.sleep(100);
  //       this.amqp.channel.ack(msg);
  //     },
  //     {},
  //   );
  //   // return a;
  // }
  // sleep(time: number): Promise<number> {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       console.log(Date.now());
  //       resolve(1);
  //     }, time);
  //   });
  // }
}
