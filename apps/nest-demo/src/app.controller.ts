import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Query('name') name: string): Promise<string> {
    const helloValue = await this.appService.getHello(name);
    return helloValue;
  }
}
