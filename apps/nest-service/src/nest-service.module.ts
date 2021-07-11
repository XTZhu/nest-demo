import { Module } from '@nestjs/common';
import { NestServiceController } from './nest-service.controller';
import { NestServiceService } from './nest-service.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [NestServiceController],
  providers: [NestServiceService],
})
export class NestServiceModule {}
