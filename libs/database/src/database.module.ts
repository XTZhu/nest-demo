import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        { name: 'LiveData', type: 'direct' },
        { name: 'broadcast', type: 'fanout' },
        { name: 'dead.letter.livedata', type: 'direct' },
      ],
      uri: 'amqp://admin:admin@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService, RabbitMQModule],
})
export class DataBaseModule {}
