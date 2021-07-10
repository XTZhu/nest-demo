import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DataBaseModule } from 'libs/database/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware, logger } from './logger.middleware';

@Module({
  imports: [
    DataBaseModule,
    ClientsModule.register([
      {
        name: 'Cat_Demo',
        transport: Transport.TCP,
        options: { port: 5961 },
      },
    ]),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // 绑定路由
    // consumer.apply(LoggerMiddleware).forRoutes('cats');

    // 绑定路由下的GET方法
    // consumer.apply(LoggerMiddleware).forRoutes({
    //   path: 'cats',
    //   method: RequestMethod.GET,
    // });

    consumer
      // 单个 
      // .apply(LoggerMiddleware)

      // 多个
      .apply(logger, LoggerMiddleware)
      .exclude(
        // 排除所有/cats的Get方法
        // { path: 'cats', method: RequestMethod.GET },
        // { path: 'cats', method: RequestMethod.POST },
        // 排除所有cats
        'cats/(.*)'
      )
      .forRoutes(CatsController);
  }
}
