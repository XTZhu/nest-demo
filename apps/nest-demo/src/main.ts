import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/intercept/logging.interceptor';
import { ExcludeNullInterceptor } from './common/intercept/exclude-null.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new LoggingInterceptor());
  // app.useGlobalInterceptors(new ExcludeNullInterceptor());
  await app.listen(5960, () => {
    console.log('nest demo is listening 5960');
  });
}

bootstrap();
