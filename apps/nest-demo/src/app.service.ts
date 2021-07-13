/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  AmqpConnection,
  Nack,
  RabbitRPC,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ConsumeMessage } from 'amqplib';

@Injectable()
export class AppService {
  constructor(
    @Inject('Cat_Demo')
    private readonly serviceclient: ClientProxy,
    private readonly amqpConnection: AmqpConnection,
  ) {
    // this.amqpConnection.channel.prefetch(1, true);
  }

  async test() {
    const queue = 'sg:unformat';
    const msg = 'Hello world';
    const a = await this.amqpConnection.channel.assertQueue(queue, {
      durable: false,
    });
    console.log(a);
    // this.amqpConnection.channel.sendToQueue(queue, Buffer.from(msg));
    // console.log(' [x] Sent %s', msg);
    let num = 0;
    while (num < 1000) {
      this.sendMsg('sg:unformat', num);
      num++;
    }
  }

  sendMsg(queue: string, num: number, isFormat?: boolean) {
    this.amqpConnection.channel.sendToQueue(
      queue,
      Buffer.from(`hello world ${num} ${isFormat ? 'format' : Date.now()}`),
    );
  }

  async formatMsg() {
    await this.amqpConnection.channel.assertQueue('sg:unformat', {
      durable: false,
    });
    this.amqpConnection.channel.consume('sg:unformat', async msg => {
      console.log(msg.content.toString(), 'sg:unformat1');
      await this.sleep(1000);
      this.sendMsg('sg:format', 1, true);

      this.amqpConnection.channel.ack(msg);
    });
    this.amqpConnection.channel.consume('sg:unformat', async msg => {
      console.log(msg.content.toString(), 'sg:unformat2');
      await this.sleep(1000);
      this.sendMsg('sg:format', 0, true);

      this.amqpConnection.channel.ack(msg);
    });
    this.amqpConnection.channel.consume('sg:unformat', async msg => {
      console.log(msg.content.toString(), 'sg:unformat3');
      await this.sleep(1000);
      this.sendMsg('sg:format', 2, true);

      this.amqpConnection.channel.ack(msg);
    });
  }

  async getMsg() {
    await this.amqpConnection.channel.assertQueue('sg:format', {
      durable: false,
    });

    await this.amqpConnection.channel.consume(
      'sg:format',
      async msg => {
        console.log(msg.content.toString(), 'sg:format');
        // a += `${msg.content.toString()}_`;
        await this.sleep(100);
        this.amqpConnection.channel.ack(msg);
      },
      {},
    );
    // return a;
  }
  sleep(time: number): Promise<number> {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(Date.now());
        resolve(1);
      }, time);
    });
  }

  // getHello(name: string): Promise<string> {
  //   const pattern = { cmd: 'getHello' };
  //   const payload = name;
  //   return lastValueFrom(
  //     this.serviceclient.send<string>(pattern, payload),
  //   );
  // }

  // getAllUser(): Promise<string> {
  //   return lastValueFrom(this.serviceclient.send<string>('findAllUsers', ''));
  // }

  // 交换机模式是 direct
  //  routingKey是有用的
  @RabbitRPC({
    exchange: 'LiveData',
    routingKey: 'unformat',
    queue: 'unformat-queue',
    queueOptions: {
      messageTtl: 6000,
      expires: 5000,
      deadLetterExchange: 'dead.letter.livedata',
      deadLetterRoutingKey: 'dead.letter.livedata.unformat',
    },
    // errorHandler: () => {},
  })
  public async pubSubHandler(payload: any): Promise<any> {
    // console.log(
    //   `Received message: ${JSON.stringify(payload)} ${this.pattyCount}`,
    // );
    // try {
    //   this.makeBurger(payload.patties);
    // } catch (error) {
    //   Logger.warn(
    //     `An error occured while preparing the burger for ${payload.customer}.`,
    //   );
    // console.log(`amqpMsg: ${JSON.stringify(amqpMsg)}`);
    console.log(`pubSubHandler ----> ${JSON.stringify(payload)}`);
    return new Nack();
    // }
  }

  // 交换机模式是 direct
  //  routingKey是有用的
  //  公用同一个队列
  // 但是routingKey不同
  @RabbitRPC({
    exchange: 'LiveData',
    routingKey: 'log',
    queue: 'log-queue',
    queueOptions: {
      messageTtl: 6000,
    },
  })
  public async logHandler(payload: any) {
    console.log(`logHandler ----> ${JSON.stringify(payload)}`);
  }

  // 交换机模式是 direct
  //  routingKey是有用的
  //  公用同一个队列
  // 但是routingKey不同
  @RabbitRPC({
    exchange: 'LiveData',
    routingKey: 'warn',
    queue: 'log-queue',
    queueOptions: {
      messageTtl: 6000,
    },
  })
  public async warnHandler(payload: any) {
    console.log(`warnHandler ----> ${JSON.stringify(payload)}`);
  }

  // 交换机模式是 direct
  //  routingKey是有用的
  @RabbitRPC({
    exchange: 'LiveData',
    routingKey: 'error',
    queue: 'error-queue',
    queueOptions: {
      messageTtl: 6000,
      // expires: 5000,
    },
  })
  public async errorHandler(payload: any) {
    console.log(`errorHandler ----> ${JSON.stringify(payload)}`);
  }

  // 订阅模式
  // 交换机模式为fanout 广播魔兽
  // routingkey 在fanout模式下不起作痛
  // 和下面一个方法公用一个队列
  // 返回一个new Nack()拒绝实例,
  // new Nack(true) 表示会requeue 重新回到队列
  // 给同一个队列下的officeHandler函数使用
  // 在messageTtl，过期后， 然后Nack() 会进入死信
  // 一个队列的expires必须相同
  @RabbitSubscribe({
    exchange: 'broadcast',
    routingKey: 'hall',
    queue: 'hall-queue',
    queueOptions: {
      messageTtl: 6000,
      deadLetterExchange: 'dead.letter.livedata',
      deadLetterRoutingKey: 'dead.letter.livedata.unformat',
    },
  })
  public async hallHandler(payload: any) {
    console.log(
      `hall --${new Date().toISOString()}--> ${JSON.stringify(payload)}`,
    );
    return new Nack(true);
  }

  // 订阅模式
  // 交换机模式为fanout 广播魔兽
  // routingkey 在fanout模式下不起作痛
  // 和上面一个方法公用一个队列
  // 返回一个new Nack()拒绝实例,
  // 上面 new Nack(true) 表示会requeue 重新回到队列
  // 未处理的消息officeHandler函数使用
  // 在messageTtl，过期后， 然后Nack() 会进入死信
  // 一个队列的expires必须相同
  @RabbitSubscribe({
    exchange: 'broadcast',
    routingKey: 'office',
    queue: 'office-queue',
    queueOptions: {
      messageTtl: 6000,
      deadLetterExchange: 'dead.letter.livedata',
      deadLetterRoutingKey: 'dead.letter.livedata.unformat',
    },
  })
  public async officeHandler(payload: any) {
    console.log(
      `office --${new Date().toISOString()}--> ${JSON.stringify(payload)}`,
    );
  }

  // 订阅模式
  // 交换机模式为fanout 广播魔兽
  // routingkey 在fanout模式下不起作痛
  // 和上面一个方法公用一个队列
  // 返回一个new Nack()拒绝实例,
  // 上面 new Nack(true) 表示会requeue 重新回到队列
  // 未处理的消息officeHandler函数使用
  // 在messageTtl，过期后， 然后Nack() 会进入死信
  // 一个队列的expires必须相同

  // 交换机broadcast 绑定了三个队列
  // office-queue
  // hall-queue
  // kitchen-queue

  // kitchen-queue 没有被方法监听
  //  那么他会直接进入绑定的死信交换机里的死信队列
  //  新建延迟队列有几个要点
  //    1.新建一个交换机
  //    2.新建一个队列
  //    3.保证这个队列不被消费
  //    4.设置他的messageTtl 为预定时间
  //    5.绑定到对应的死信队列

  // @RabbitSubscribe({
  //   exchange: 'broadcast',
  //   routingKey: 'kitchen',
  //   queue: 'kitchen-queue',
  //   queueOptions: {
  //     messageTtl: 6000,
  //     deadLetterExchange: 'dead.letter.livedata',
  //     deadLetterRoutingKey: 'dead.letter.livedata.unformat',
  //   },
  // })
  // public async kitchenlHandler(payload: any) {
  //   console.log(
  //     `kitchen --${new Date().toISOString()}--> ${JSON.stringify(payload)}`,
  //   );
  // }

  // 交换机， routingKey, queue 完全相同的两个方法
  // 被RabbitSubscribe修饰后routingKey会失效，因为是广播模式
  // 会争抢 dead.letter.livedata.unformat-queueA内的消息
  // 4条消息 Function A -> Function B -> Function A -> Function B
  @RabbitSubscribe({
    exchange: 'dead.letter.livedata',
    routingKey: 'dead.letter.livedata.unformat',
    queue: 'dead.letter.livedata.unformat-queueA',
  })
  public async deadLetterHandlerA(msg: any, ampqMsg: ConsumeMessage) {
    console.log(
      `! deadLetterHandler Received message: ${JSON.stringify(msg)} A`,
    );
    console.log(
      `deadLetterHandlerA ---${new Date().toISOString()}---> ${
        ampqMsg.fields
      }, ${ampqMsg.properties}`,
    );
  }

  // 交换机， routingKey, queue 完全相同的两个方法
  // 被RabbitSubscribe修饰后routingKey会失效，因为是广播模式
  // 会争抢 dead.letter.livedata.unformat-queueA内的消息
  // 4条消息 Function A -> Function B -> Function A -> Function B
  @RabbitSubscribe({
    exchange: 'dead.letter.livedata',
    routingKey: 'dead.letter.livedata.unformat',
    queue: 'dead.letter.livedata.unformat-queueA',
  })
  public async deadLetterHandlerB(msg: any, ampqMsg: ConsumeMessage) {
    console.log(
      `! deadLetterHandler Received message: ${JSON.stringify(msg)} B`,
    );
    console.log(
      `deadLetterHandlerB ---${new Date().toISOString()}---> ${
        ampqMsg.fields
      }, ${ampqMsg.properties}`,
    );
  }
}
