import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DataBaseModule } from 'libs/database/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

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
export class AppModule {}
