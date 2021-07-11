import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import { Module } from '@nestjs/common';

export { ConfigService };

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      cache: true,
      // 自定义配置文件
      load: [],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
