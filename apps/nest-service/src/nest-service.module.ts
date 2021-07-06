import { Module } from '@nestjs/common';
import { NestServiceController } from './nest-service.controller';
import { NestServiceService } from './nest-service.service';

@Module({
  imports: [],
  controllers: [NestServiceController],
  providers: [NestServiceService],
})
export class NestServiceModule {}
