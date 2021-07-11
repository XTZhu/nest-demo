import { Module } from '@nestjs/common';
import { NestServiceController } from './nest-service.controller';
import { NestServiceService } from './nest-service.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [NestServiceController],
  providers: [NestServiceService],
})
export class NestServiceModule {}
