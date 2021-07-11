import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/intercept/logging.interceptor';
import { ExcludeNullInterceptor } from './common/intercept/exclude-null.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new LoggingInterceptor());
  // app.useGlobalInterceptors(new ExcludeNullInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Cat example')
    .setDescription('The Cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // api 请求地址http://localhost:5960/api/
  // api 文档http://localhost:5960/api-json

  // 要为应用程序中的每个路由设置前缀, 让我们使用 INestApplication 对象的 setGlobalPrefix() 方法。
  app.setGlobalPrefix('v1');

  await app.listen(5960, () => {
    console.log('nest demo is listening 5960');
  });
}

bootstrap();
