import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NestServiceService } from './nest-service.service';

@Controller()
export class NestServiceController {
  constructor(private readonly nestServiceService: NestServiceService) {}

  @MessagePattern({ cmd: 'getHello' })
  getHello(name: string): string {
    return this.nestServiceService.getHello(name);
  }

  @MessagePattern({ cmd: 'message_printed' })
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(data.text);
  }
}
