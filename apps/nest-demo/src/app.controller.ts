import { ConfigService } from '@app/config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Message } from './message.event';

@Controller()
// @Controller({ host: 'admin.example.com' })
// @Controller({ host: ':account.example.com' })
// @Get()
//   getInfo(@HostParam('account') account: string) {
//     return account;
//   }
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly amqpConnection: AmqpConnection,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async getHello(@Query('name') name: string): Promise<string> {
    const helloValue = await this.appService.getHello(name);
    this.amqpConnection.publish('exchange1', 'soha.pub', {
      msg: 'hello world',
    });
    return helloValue;
  }

  @Get('all_user')
  async getAllUser(): Promise<string> {
    const helloValue = await this.appService.getAllUser();
    console.log(this.configService.get<string>('DB_HOST')); // localhost
    return helloValue;
  }

  @Get('get_hello')
  getHelloMQ(): string {
    this.amqpConnection.publish('exchange1', '*', new Message('hello bialal'));
    return 'Hello world printed';
  }
}
