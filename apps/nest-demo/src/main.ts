import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5960, () => {
    console.log('nest demo is listening 5960');
  });
}
bootstrap();
