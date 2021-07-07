import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { NestServiceService } from './nest-service.service';

@Controller()
export class NestServiceController {
  constructor(private readonly nestServiceService: NestServiceService) {}

  @MessagePattern({ cmd: 'getHello' })
  getHello(name: string): string {
    return this.nestServiceService.getHello(name);
  }

  @MessagePattern('notifications')
  getNotifications(
    @Payload() data: number[],
    @Ctx() context: RmqContext,
  ): void {
    // 要获取RabbitMQ频道的引用，使用RmqContext对象的getChannelRef方法。
    const channel = context.getChannelRef();
    // 要实用原生的RabbitMQ消息(包含properties, fields, 和content), 使用 RmqContext对象的getMessage()方法：
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    console.log(`Pattern: ${context.getPattern()}`);
  }
}
