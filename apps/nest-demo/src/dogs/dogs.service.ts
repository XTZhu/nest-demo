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

  test(): void {
    const queue = 'hello';
    const msg = 'Hello world';

    this.amqpConnection.channel.assertQueue(queue, {
      durable: false,
    });

    this.amqpConnection.channel.sendToQueue(queue, Buffer.from(msg));
    console.log(' [x] Sent %s', msg);
  }

  receiveMsg(): void {
    const queue = 'hello';
    this.amqpConnection.channel.assertQueue(queue, {
      durable: false,
    });

    this.amqpConnection.channel.consume(
      queue,
      (msg: any) => {
        console.log(' [x] Received %s', msg.content.toString());
      },
      {
        noAck: true,
      },
    );
  }
}
