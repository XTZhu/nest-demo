import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Injectable()
export class DogsService {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  create(createDogDto: CreateDogDto): string {
    return 'This action adds a new dog';
  }

  getMsg(msg: string): void {
    const queue = 'hello';
    const msgStr = msg || 'hello world';

    this.amqpConnection.channel.assertQueue(queue, {
      durable: false,
    });

    this.amqpConnection.channel.sendToQueue(queue, Buffer.from(msgStr));
    console.log(' [x] Sent %s', msg);
  }

  receiveMsg(): void {
    const queue = 'hello';
    this.amqpConnection.channel.assertQueue(queue, {
      durable: false,
    });

    this.amqpConnection.channel.prefetch(1, true);

    this.amqpConnection.channel.consume(
      queue,
      (msg: any) => {
        const secs = msg.content.toString().split('.').length - 1;
        console.log(' [x] Received %s', msg.content.toString());
        console.log(`work1-------${Date.now()}`);
        setTimeout(() => {
          this.amqpConnection.channel.ack(msg);
          console.log(' [x] finished ');
        }, secs * 1000);
      },
      {
        noAck: false,
      },
    );
    this.amqpConnection.channel.consume(
      queue,
      (msg: any) => {
        const secs = msg.content.toString().split('.').length - 1;
        console.log(' [x] Received %s', msg.content.toString());
        console.log(`work2-------${Date.now()}`);
        setTimeout(() => {
          this.amqpConnection.channel.ack(msg);
          console.log(' [x] finished ');
        }, secs * 1000);
      },
      {
        noAck: false,
      },
    );
  }

  // sendFanoutMsg(): void {
  //   this.amqpConnection.channel.publish(
  //     'liveData',
  //     '',
  //     Buffer.from('Hello world'),
  //   );
  // }

  // receivedFanoutMsg(): void {
  //   this.amqpConnection.channel.assertQueue('', {
  //     exclusive: true,
  //   });

  // }
}
