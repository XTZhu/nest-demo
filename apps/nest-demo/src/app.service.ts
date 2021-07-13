/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Nack, RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ConsumeMessage } from 'amqplib';

@Injectable()
export class AppService {
  constructor(
    @Inject('Cat_Demo')
    private readonly serviceclient: ClientProxy,
  ) {}

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
  public async pubSubHandler(
    payload: any,
    amqpMsg: ConsumeMessage,
  ): Promise<any> {
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
