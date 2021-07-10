import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

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
  ) { }

  @Get()
  async getHello(@Query('name') name: string): Promise<string> {
    const helloValue = await this.appService.getHello(name);
    this.amqpConnection.publish('exchange1', 'soha.pub', { msg: 'hello world' });
    return helloValue;
  }
}
